---
layout: post
author: Pierre
title: SQL Alchemy, Python e Bares
---

Resolvi finalmente estudar um pouco mais a fundo o [SQL Alchemy](https://www.sqlalchemy.org/), o famoso pacote do Python que possibilita a integração do Python com diversos Bancos de Dados relacionais.

Pensando em algo que pudesse tornar o estudo mais interessante, resolvi criar um app sobre um assunto bastante comum no cotidiano: contas de clientes em bares.

O que tornou tudo isso interessante pra mim foi descobrir como representar essas coisas num banco de dados utilizando a dobradinha Python/SQL Alchemy.

> Este post supõe que você tenha conhecimentos básicos de conceitos do SQL, como Cardinalidade.

## Bares, Clientes, Contas e Cardinalidade

Contas e Bares seria mais simples, um caso clássico de "Many To Many": Clientes podem ter múltiplos Bares e Bares podem ter múltiplos Clientes.

Mas e as Contas?

Uma conta não é um atributo de um Cliente nem de um Bar, ela só existe quando há uma relação entre os dois. 

O diagrama das tabelas desse Banco de dados portanto teria que ficar algo assim:

![Gráfico ERP]({{ '/assets/img/erd.png' | relative_url }})

Como se vê, Clientes (CLIENT) e Bares (BAR) podem se associar múltiplas vezes e nos dois sentidos. As Contas por sua vez, precisariam ficar na tabela aonde a associação é feita, a Tabela Pivô (BILLS).

Felizmente, o SQL Alchemy [prevê esse caso](https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html#association-object) na documentação. Faltava então partir para a implementação.

## Desenhando os Modelos

Quando trabalhamos com uma ORM é necessário criar classes que serão "mapeadas" com tabelas num banco de dados. Cada propriedade da classe será uma coluna da respectiva tabela. 

Uma classe nesse contexto passa a ser chamada "Modelo".

Numa relação "Many To Many" tradicional, os modelos `Client` e `Bar` seriam suficientes. Mas aqui teremos que criar o também o modelo `Bills`, pois o valor da conta ficará nele.

O código então ficará assim:

```python
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import List

class Base(DeclarativeBase):
    pass

class Client(Base): 
    __tablename__ = "client"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True)
 
class Bar(Base):
    __tablename__ = "bar"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)

class Bills(Base):
    __tablename__ = "bills"
    client_id: Mapped[int] = mapped_column(ForeignKey("client.id"), primary_key=True)
    bar_id: Mapped[int] = mapped_column(ForeignKey("bar.id"), primary_key=True)
    bill: Mapped[float]

```
Deixando de lado os elementos específicos do SQL Alchemy por enquanto, vemos que o código acima define três modelos, que são:

- `Client`
- `Bar`
- `Bills`

As propriedades de `Client` e `Bar` são simplemente o nome (`name`) e o `id`, que também é a Chave Primária. Já `Bills`, que será a Tabela Pivô, possui as Chaves Estrangeiras de `Client` e `Bar` e também a propriedade `bill`, que é justamente o valor da conta, como falamos acima.

## API do SQL Alchemy

O SQL Alchemy possui uma API extensa, onde há muitas formas de integrar o código Python com o Banco de Dados (até o uso da ORM é opcional). A opção adotada aqui é considerada na documentação como a mais atual, a chamada "Declarative Mapping". 

Essa é a razão de usarmos a classe `DeclarativeBase` como classe-pai dos nossos modelos, como mostrado acima:

```python
class Base(DeclarativeBase):
    pass
```

Basicamente a "Declarative Mapping" prevê que para definir as colunas das nossas tabelas é necessário seguir o seguinte padrão:

```python
{nome_da_coluna}: Mapped[{tipo_da_coluna}] = mapped_column({outras_propriedades_da_coluna})
```

Este padrão prevê que as informações sobre cada coluna de uma tabela sejam passadas em dois lugares distintos e complementares. No canto esquerdo, através do _annotation_ `Mapped` e no canto direto através da função `mapped_column()`. 

Na [documentação oficial](https://docs.sqlalchemy.org/en/20/orm/mapping_styles.html#orm-declarative-mapping) da biblioteca você pode aprender mais sobre esta API. 

> O `Mapped` pode despertar curiosidade pra quem não está tão habituados com o uso de tipos no Python. A documentação do SQL Alchemy [também oferece conteúdo detalhado sobre isso](https://docs.sqlalchemy.org/en/20/orm/mapping_styles.html#orm-mapping-styles).

O que nos interessa aqui, no entanto, é entender como o SQL Alchemy vai resolver os relacionamentos entre os nossos modelos e como podemos trabalhar com eles no nosso código.

## Dinamizando os relacionamentos com o `relationship`

Olhando o modelo `Bills`, podemos ver os relacionamentos entre Bares e Clientes declarados.

```python
client_id: Mapped[int] = mapped_column(ForeignKey("client.id"), primary_key=True)
bar_id: Mapped[int] = mapped_column(ForeignKey("bar.id"), primary_key=True)
```

Como num "Many To Many" tradicional, esta é a nossa Tabela Pivô e vai portanto levar as chaves estrangeiras (`ForeignKey`) de cada um.

O SQL Alchemy também oferece a função `relationship()`, que se destina a propriedades da classe que não vão ser mapeadas no banco de dados, mas ajudarão na hora de trabalhar com os relacionamentos no código.

Vamos ver como isso se dá na prática. 

Primeiro vamos reescrever nossos modelos adicionando alguns novos atributos.

```python
class Client(Base): 
    __tablename__ = "client"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True)
    bills: Mapped[List["Bills"]] = relationship(back_populates="client")
 
class Bar(Base):
    __tablename__ = "bar"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=True)
    bills: Mapped[List["Bills"]] = relationship(back_populates="bar")

class Bills(Base):
    __tablename__ = "bills"
    client_id: Mapped[int] = mapped_column(ForeignKey("client.id"), primary_key=True)
    bar_id: Mapped[int] = mapped_column(ForeignKey("bar.id"), primary_key=True)
    bill: Mapped[float]
    bar: Mapped["Bar"] = relationship(back_populates="bills")
    client: Mapped["Client"] = relationship(back_populates="bills")
```

Adicionamos uma nova propriedade em `Client` e `Bar` chamada `bills`, que tem como valor o `relationship()`. Repare que em ambos o annotation `Mapped` declara o modelo com o qual estamos criando o relacionamento - `Bills`. Em ambos os casos também declaramos que esperamos uma lista (`Mapped[List["Bills"]]`) e que portanto a relação será "One To Many".

Já em `Bills` incluímos duas propriedades, `bar` e `client`, que criam a relação com os modelos `Bar` e `Client`, respectivamente. Aqui no entanto só passamos os modelos desejados (`Mapped["Bar"]` e `Mapped["Client"]`), o que indica que a relação será "One To One".

Basicamente, essas novas propriedades nos permitirão trabalhar com os relacionamentos (criando, apagando etc) diretamente no código de modo muito simples.

## Criando e relacionando tudo

Vamos partir então finalmente para um exemplo de criação de um cliente que tenha uma conta em um bar, agora que temos todos os modelos - `Client`, `Bar` e `Bills` - devidamente criados e configurados.

> Os exemplos em código dados aqui não necessitam de um banco de dados e podem ser testados com a ajuda do Python em seu terminal. 

Primeiro vamos criar um cliente e uma conta.

```shell-session
>>> cliente = Client(name="Amigo do Zé")
>>> conta = Bills(bill=20.5)
```

Agora vamos relacionar esta conta ao cliente criado.

```shell-session
>>> cliente.bills.append(conta)
```

Usamos aqui a propriedade `bills` no modelo `Client`: 

```python
bills: Mapped[List["Bills"]] = relationship(back_populates="client")
```

Repare novamente que nesta propriedade o _annotation_ `Mapped[List["Bills"]]` indica que o cliente possui uma **lista** de contas. Por isso temos que usar o _append()_ para inserir um novo relacionamento.

Agora nosso cliente possui uma lista de contas que podemos inspecionar como quisermos. Por exemplo:

```shell-session
>>> cliente.bills
[Bills(bill=20.5)]
```

```shell-session
>>> cliente.bills[0]
Bills(bill=20.5)
```

ou

```shell-session
>>> cliente.bills[0].bill
20.5
```

Vamos agora criar um bar e adicioná-lo à conta que acabamos de criar.

```shell-session
>>> bar = Bar(name="Bar do Zé")
>>> conta.bar = bar
```

Repare que aqui não associamos o bar diretamente ao cliente, mas sim à conta, que é a Tabela Pivô. Usamos a propriedade `bar` no modelo `Bills`, que cria um relacionamento com `Bar`.

```python
bar: Mapped["Bar"] = relationship(back_populates="bills")
```

Aqui, como o relacionamento é "One to One" podemos simplesmente setar o valor da propriedade `bar`.

Agora vamos parar e pensar um pouco no que acabamos de fazer. Temos criadas uma instância de `Client` (cliente), uma de `Bills` (conta) e uma de `Bar` (bar).

Em seguida relacionamos a conta ao cliente e em seguida um bar àquela conta.

Logo o bar também está associado ao cliente, não?

No nosso desenho, clientes (`Client`) não possuem bares (`Bar`), mas contas (`Bills`) sim. E podemos ver os clientes e bares de uma conta.

```shell-session
>>> conta.client
Client(id=None, name='Amigo do Zé')
```

O cliente está lá! 

Você pode estar se perguntando com a propriedade `client` foi atualizada sem que fizéssemos nada. A resposta é o `back_populates`:

```python
bills: Mapped[List["Bills"]] = relationship(back_populates="client")
```

Quando relacionamentos uma conta a um cliente o `back_populates` atualiza a propriedade `client` em `Bills`.

Da mesma forma, quando adicionamos um bar a uma conta usamos a propriedade `bar` em `Bills`:

```python
bar: Mapped["Bar"] = relationship(back_populates="bills")
```

Aqui, o `back_populates` atualiza a propriedade `bills` em `Bar`. Vamos testar:

```shell-session
>>> bar.bills
[Bills(bill=20.5)]
```

Aí está! Legal, não é?

Se está parecendo um pouco confuso à primeira vista, recomendo abrir um terminal do Python, importar os modelos criados aqui e testar todas as propriedades. 

## Conclusão

Espero poder ter passado de forma simples estes conceitos e as APIs do SQL Alchemy. Ler a documentação não é das coisas mais prazerosas, e por isso espero que esta leitura tenha te ajudado a iniciar seus passos com o SQL Alchemy de maneira mais suave.



