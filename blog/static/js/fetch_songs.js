/**
 *  Scripts Mundo Lunar
 * 
 */

Vue.createApp({
	data() {
		return {
			song: {
				song_id: '',
				title: '',
				proxima: '',
				anterior: '',
				date: ''
			}
		}
	},
	compilerOptions: {
		delimiters : ['[[', ']]']
	},
	methods: {
		fetchSong(slug){

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
				this.song.song_id = data.song_id;
				this.song.title = data.title;
				this.song.proxima = data.proxima;
				this.song.anterior = data.anterior;
				this.song.date = data.date;

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
				SCWidget.setAttribute('src',encodeURI(SCURl)+data.song_id+"&"+SCParams);
				songdiv.querySelector('div').appendChild(SCWidget);
			});
		}
	},
	created() {
		console.log('hi there Vue')
	}
}).mount('#main');
