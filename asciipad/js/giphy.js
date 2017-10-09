	var GIPHY_API_KEY = "0FbjjXbi0j9OZ5QwbvXfZuQ6pQ5U9iRP";
	var GIPHY_RATING = 'PG-13'
	var GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search?api_key=" + GIPHY_API_KEY;
	var gifs = [];
	var httpRequest;

	var bg_gif = document.getElementById('bg-gif');



    function getGiphy(_query){
	    if(_query){ 
	    	var queryStripped = _query.replace(/\s/g, '+'); 
	    }
	    else{ 
	    	queryStripped = 'adventure+time'; 
	    }
	    
	    var searchURL = GIPHY_API_URL + '&q=' + queryStripped + '&limit=10&offset=0&rating=' + GIPHY_RATING + '&lang=en';
	    makeRequest(searchURL);
	}



	  function makeRequest(_URL, _callback) {
	    httpRequest = new XMLHttpRequest();
	    if (!httpRequest) {
	      alert('Giving up :( Cannot create an XMLHTTP instance');
	      return false;
	    }
	    httpRequest.onreadystatechange = checkResponse;
	    httpRequest.open('GET', _URL);
	    httpRequest.send();
	  }

	  function setGifs(_giphyData){
	  	var data = JSON.parse(_giphyData);
	  	gifs = [];

	    for(var key in data.data){
			if(data.data[key].images.original.url){
				var gif = data.data[key].images.original.url;
				gifs.push(gif);
			}
	  	}
	  	setBackground(true);
	  }


	  function checkResponse(){
	     if (httpRequest.readyState === XMLHttpRequest.DONE) {
	      if (httpRequest.status === 200) {
	       	setGifs(httpRequest.responseText);
	      } else {
	        console.log('bad response');
	      }
	    }
	  }


	 function setBackground(_random){
	 	if(gifs.length > 0){
		 	var index = 0;
		 	if(_random){
		 		index = Math.floor((Math.random() * gifs.length) + 1);	
		 	}
		 	bg_gif.style.backgroundImage = 'url(' + gifs[index] + ')';	
	 	}
	 }