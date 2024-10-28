/**
 *  Scripts Mundo Lunar
 * 
 * 	Janeiro 2022
 * 
 */

Vue.createApp({
	data() {
		return {
			song: {
				soundcloud_id: '',
				title: '',
				proxima: '',
				anterior: '',
				data_gravacao: '',
				autoria: '',
				equipamentos: '',
				instrumentos: '',
				clima: '',
			},
			contentAll: '',
			songDiv: ''
		}
	},
	compilerOptions: {
		delimiters : ['[[', ']]']
	},
	methods: {
		close(){
			
			this.contentAll.forEach((el)=>el.style.display = "none");

			window.scrollTo({
			  top: 0,
			  left: 0,
			  behavior: 'smooth'
			});

		},
		navigate(name){

			this.contentAll.forEach((el)=>el.style.display = "none");

			const contentArea = [...this.contentAll].filter((el)=>el.classList.contains(name))[0];

			if(name != 'index') {
				contentArea.style.display = "block";
			} else {
				contentArea.style.display = "flex";
			}

			window.scrollTo({
				top: contentArea.offsetTop - 20,
				left: 0,
				behavior: 'smooth'
			});

		},
		fetchSong(slug){

			if(!slug) return;

			if(this.songDiv.style.display != "block" || window.scrollY < 900) {

				this.songDiv.style.display = "block";

				window.scrollTo({
					top: this.songDiv.offsetTop - 20,
					left: 0,
					behavior: 'smooth'
				});
			}

			// Fetch

			fetch(`song/${slug}`, {
				headers: {
			      'Content-Type': 'application/json'
			    },
			})
			.then(response => response.json())
			.then(data => {
				this.song.soundcloud_id = data.soundcloud_id;
				this.song.title = data.title;
				this.song.proxima = data.proxima;
				this.song.anterior = data.anterior;
				this.song.data_gravacao = data.data_gravacao;
				this.song.autoria = data.autoria;
				this.song.equipamentos = data.equipamentos;
				this.song.instrumentos = data.instrumentos;
				this.song.clima = data.clima;

				// Soundcloud

				this.songDiv.querySelector('div').innerHTML = '';

				const SCURl = "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/";
				const params = {
					'color':'23ff5500',
					'auto_play':'false',
					'hide_related':'false',
					'show_comments':'true',
					'show_user':'true',
					'show_reposts':'false',
					'show_teaser':'true',
					'visual':'true'
				}
				const SCParams = new URLSearchParams(params);
				const SCWidget = document.createElement("iframe");
				SCWidget.setAttribute('allow','autoplay');
				SCWidget.setAttribute('frameborder','no');
				SCWidget.setAttribute('width','100%');
				SCWidget.setAttribute('height','300px');
				SCWidget.setAttribute('src',encodeURI(SCURl)+this.song.soundcloud_id+"&"+SCParams);
				this.songDiv.querySelector('div').appendChild(SCWidget);
			});
		}
	},
	mounted(){
		this.contentAll = document.querySelectorAll('.content');
		this.songDiv = document.querySelector(".content.song");
	}
}).mount('body');
