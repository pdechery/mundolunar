/**
 *  Scripts Mundo Lunar
 * 
 */

 // seletores

const link = document.querySelectorAll('.cell a');
const content = document.querySelectorAll('.content');
const close = document.querySelectorAll('a.close');
const contentAll = document.querySelectorAll('.content');
const menuIndex = document.querySelectorAll('.content.index a');

const elHeight = 300;


/**
 * Exibir Blocos Conteúdo
 * 
 * - Exibe o bloco mediante parâmetro
 * - Se for passado nome da música irá fazer o fetch *após* o Scroll (mas não está funcionando bem)
 * 
 */ 

function showContent(name, song) {
	
	const cara = [...contentAll].filter((el)=>el.classList.contains(name));
	
	cara[0].style.display = "block";

	window.scrollTo({
		top: cara[0].offsetTop - 20,
		left: 0,
		behavior: 'smooth'
	});

	debugger;

	if(song) fetchSong(song);

}

/**
 * Menu de músicas
 * 
 * - Oculta todos os blocos de conteúdo
 * - Exibe o bloco da música selecionada
 * 
 */ 

menuIndex.forEach((el)=>{

	el.addEventListener('click', (ev)=> {

		ev.preventDefault();

		contentAll.forEach((el)=>el.style.display = "none");

		showContent('songmenu', el.dataset.name);
	
	})

});

/**
 * Navegação nos cards
 * 
 * - Identifica qual bloco será exibido/scrollado através de classe no link
 *
 */

link.forEach((el)=>{

	el.addEventListener('click', (ev)=>{

		ev.preventDefault();

		let offsetTop = el.parentNode.parentNode.offsetTop;

		if(el.classList.contains('index')) {
			showContent('index', null);
		}

		if(el.classList.contains('song')) {
			showContent('song', null);
		}

		if(el.classList.contains('sobre')) {
			showContent('sobre', null);
		}

	});

});

/**
 * Fechar Blocos Conteúdo
 * 
 */

close.forEach(function(el){

	el.addEventListener('click', function(ev){
		
		ev.preventDefault();

		window.scrollTo({
		  top: 0,
		  left: 0,
		  behavior: 'smooth'
		});

		contentAll.forEach((el)=>el.style.display = "none");
	
	})

});