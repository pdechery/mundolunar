/**
 *  Scripts Mundo Lunar
 * 
 */

const link = document.querySelectorAll('.cell a');
const content = document.querySelectorAll('.content');
const xebs = document.querySelectorAll('a.xebs');
const contentAll = document.querySelectorAll('.content');
const menuIndex = document.querySelectorAll('.content.index a');
const elHeight = 300;

function showContent(name) {
	const cara = [...contentAll].filter((el)=>el.classList.contains(name));
	cara[0].style.display = "block";
	//cara[0].scrollIntoView();
}

menuIndex.forEach((el)=>{

	el.addEventListener('click', (ev)=> {

		ev.preventDefault();

		contentAll.forEach((el)=>el.style.display = "none");

		showContent('songmenu');

		let contentSongMenu = document.querySelector('.content.songmenu');

		window.scrollTo({
		  top: contentSongMenu.offsetTop - 20,
		  left: 0,
		  behavior: 'smooth'
		});
	
	})

});

link.forEach((el)=>{

	el.addEventListener('click', (ev)=>{

		ev.preventDefault();

		let offsetTop = el.parentNode.parentNode.offsetTop;

		if(el.classList.contains('index')) {
			showContent('index');
		}

		if(el.classList.contains('song')) {
			showContent('song');
		}

		if(el.classList.contains('sobre')) {
			showContent('sobre');
		}

		window.scrollTo({
		  top: offsetTop + elHeight,
		  left: 0,
		  behavior: 'smooth'
		});

	});

});

xebs.forEach(function(el){

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