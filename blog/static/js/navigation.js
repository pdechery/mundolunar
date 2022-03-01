/**
 *  Scripts Mundo Lunar
 * 
 */

 // seletores

const linkCells = document.querySelectorAll('.cell');
const content = document.querySelectorAll('.content');
const close = document.querySelectorAll('a.close');
const contentAll = document.querySelectorAll('.content');
//const songIndex = document.querySelectorAll('.content.index a');
const up = document.querySelector("#up");

// window.addEventListener('scroll', function(e) {
// 	up.textContent = window.scrollY;
// });

/**
 * Voltar ao topo
 * 
 */

function goUp() {
	
	window.scrollTo({
	  top: 0,
	  left: 0,
	  behavior: 'smooth'
	});

	contentAll.forEach((el)=>el.style.display = "none");
}

up.addEventListener('click', goUp);

close.forEach((el)=>{	
	el.addEventListener('click', goUp);
});


/**
 * Exibir Blocos Conteúdo
 * 
 * - Exibe o bloco mediante parâmetro
 * - Se for passado nome da música irá fazer o fetch após o Scroll
 * 
 */ 

function showContent(name, song) {
	
	const contentArea = [...contentAll].filter((el)=>el.classList.contains(name))[0];
	
	contentArea.style.display = "block";

	window.scrollTo({
		top: contentArea.offsetTop - 20,
		left: 0,
		behavior: 'smooth'
	});

}

/**
 * Navegação nos cards
 * 
 * - Identifica qual bloco será exibido/scrollado através de classe no link
 *
 */

linkCells.forEach((el)=>{

	el.addEventListener('click', (ev)=>{

		ev.preventDefault();

		let offsetTop = el.parentNode.parentNode.offsetTop;

		if(el.classList.contains('index')) {
			showContent('index', null);
		}

		if(el.classList.contains('song-destaque')) {
			showContent('song-destaque', null);
		}

		if(el.classList.contains('sobre')) {
			showContent('sobre', null);
		}

	});

});