	/**
 *  Scripts Mundo Lunar
 * @todo passar para Vue
 * @todo passar URLs para o Settings e trazer do BE
 * 
 */

const songdiv = document.querySelector(".content.song");

function fetchSong(song) {

	fetch(`/${song}`, {
		headers: {
	      'Content-Type': 'application/json'
	    },
	})
	.then(response => response.json())
	.then(data => {
		songdiv.querySelector('div').innerHTML="";
		songdiv.querySelector('h2').innerHTML=data.title;
		return data;
	})
	.then(data => {
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
