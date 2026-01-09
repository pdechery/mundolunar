---
layout: post
author: Pierre
title: Rodando o Jekyll localmente com a ajuda do Docker
---
Eu estava com a idéia de criar um blog e pensei que dessa vez não queria me envolver com frameworks nem banco de dados.

Por outro lado, vinha usando o Markdown pra escrever algumas coisas e me peguei pensando como seria bom se eu pudesse ter um blog usando o Markdown! Sem HTML, editor WYSIWYG, nada disso.

Pensei em ler mais sobre como o Github Pages funciona e lá conheci o Jekyll, que [é integrado ao Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#syntax-highlighting).

## Jekyll

O Jekyll é um projeto antigo - nem sei se ainda continua muito ativo - que gera sites estáticos a partir de HTML ou Markdown e também tem uma linguagem de template chamada "Liquid", que é similar ao que existe em frameworks como Django e Flask.

Não pretendo detalhar muito aqui sobre o Jekyll em si, mas a [documentação é bem simples](https://jekyllrb.com/docs/) e em um ou dois dias acredito que um dev consiga trabalhar confortavelmente com ele.

No entanto, lendo a mesma documentação descobri que ele é criado com o Ruby, uma linguagem que eu não tinha instalada em minha máquina.

Normalmente eu fugiria da situação de ter que lidar com uma linguagem nova para um projeto tão rápido. Mas eu queria testar aquela solução e pensei um usar o Docker como um facilitador.

## Workflow com o Docker

O Docker pra mim sempre é uma ótima solução quando preciso testar uma tecnologia na minha máquina mas não quero instalar nada nela. 

Nesse caso eu teria que criar uma imagem que tivesse o Ruby, além, obviamente, do Jekyll, que é um pacote (`gem`) do Ruby.

Voltei então para a documentação do Jekyll para entender como é a instalação e, após um certo tempo de tentativa e erro, criei um `Dockerfile` que funcionou.

```docker
FROM debian:12-slim

RUN apt-get update && \
    apt-get -y install ruby-full build-essential

RUN useradd -m pdechery

ENV HOME="/home/pdechery"

ENV GEM_HOME="$HOME/gems"
ENV PATH="$HOME/gems/bin:$PATH"

USER pdechery

RUN gem install jekyll bundler

WORKDIR $HOME/blog

COPY _config.yml .
COPY Gemfile .

RUN bundle

CMD ["env"]
```
Sem entrar muito em detalhes, o que este `Dockerfile` faz é:

- Utiliza a imagem `debian:12-slim` como base
- Instala o Ruby e outro pacote que constava na documentação como necessário
- Cria um usuário - _pdechery_ - e as variáveis de ambiente que permitirão a instalação das `gems` na "home" deste usuário (`/home/pdechery`). Isto é recomendado na documentação do Jekyll.
- Instala o Jekyll e o "bundler" - uma espécie de gerenciador de pacotes do Ruby
- Seta o diretório aonde serão rodados os comandos posteriores
- Copia para a imagem arquivos de configuração do Jekyll que declaram todos os pacotes (`gems`) que meu blog vai usar (algo como o "package.json" do node.js)
- Instala estas `gems`

A última linha não é importante e será sobrescrita na hora de rodar o container.

Ao final de tudo isso eu _buildei_ minha nova imagem:

```docker
docker build -t blog .
```

Agora era só criar meus markdowns e rodar o container para ver meu blog localmente.

## Diretório do blog

Esqueci de mencionar que o Dockerfile acima foi criado dentro do diretório do blog, previamente criado e que só continha o tal Dockerfile até o momento.

Para iniciar o trabalho com o blog, no entanto, eu precisava de um Post e pelo menos de uma Landing Page, ou uma Home. Criei então os respectivos arquivos, seguindo as recomendações da documentação do Jekyll.

A estrutura dos diretórios ficou assim:

```
.
├── about.md
├── _config.yml
├── docker-compose.yaml
├── Dockerfile
├── Gemfile
├── index.md
├── _posts
│   ├── 2025-01-09-jekyll-docker.md
```
Acredite se quiser, somente com esses arquivos o Jekyll te entregará um blog com direito a tema, navegação e um monte de outras coisas - se você estiver interessado em conhecer os plugins.

Mas para aquilo que eu quero aconteça, ou seja, meus markdowns serem transformados em HTML "estático" pronto para ser servido na web, eu teria que rodar:

```
bundle exec jekyll serve
```

O `jekyll serve` faz o _build_ do site e inicia um servidor em Ruby para você visualizar as páginas em `localhost:4000`. 

Mas eu só posso rodar esse comando no container, certo?

## Criando o container

Também depois de alguma pesquisa acabei construindo um _docker-compose.yaml_ para facilitar minha vida.

Ele ficou assim:

```yaml
services:
  jekyll:
    image: blog
    volumes:
     - .:/home/pdechery/blog
    ports:
     - 4000:4000
    command: bundle exec jekyll serve --livereload
```
Nada muito complicado e funcionou como esperado.

Após rodar `docker compose up` o site estava disponível em "localhost:4000" e subitamente aquela minha pasta do blog agora tinha novos arquivos, produzidos pelo _build_ do Jekyll

```
.
├── about.md
├── _config.yml
├── docker-compose.yaml
├── Dockerfile
├── Gemfile
├── Gemfile.lock
├── index.md
├── _posts
│   ├── 2025-01-09-jekyll-docker.md
└── _site
    ├── 2025
    ├── about.html
    ├── feed.xml
    └── index.html
```
O processo do _build_ criou um diretório "_site" que é onde ficam os arquivos estáticos que serão de fato servidos.

O Github Pages por sinal, possui o _build_ do Jekyll embutido e fará todo o processo para você, se quiser hospedar seu blog lá. Pode iniciar [por aqui](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Conclusão

Com isso, espero ter ajudado a você ter tido seu primeiro contato com o Jekyll - caso não tenha - e também conhecer uma nova forma de usar o Docker para ajudar em seus pequenos ou grandes projetos pessoais.


