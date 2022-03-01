/**
 *  Scripts Mundo Lunar
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
				clima: ''
			}
		}
	},
	compilerOptions: {
		delimiters : ['[[', ']]']
	},
	methods: {
		fetchSong(slug){

			if(slug == 0) return;

			const songdiv = document.querySelector(".content.song");

			if(songdiv.style.display != "block") {

				songdiv.style.display = "block";

				window.scrollTo({
					top: songdiv.offsetTop - 20,
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

				songdiv.querySelector('div').innerHTML = '';

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
				SCWidget.setAttribute('frameborder','no')
				SCWidget.setAttribute('width','100%');
				SCWidget.setAttribute('height','300px');
				SCWidget.setAttribute('src',encodeURI(SCURl)+this.song.soundcloud_id+"&"+SCParams);
				songdiv.querySelector('div').appendChild(SCWidget);
			});
		}
	}
}).mount('#main');
