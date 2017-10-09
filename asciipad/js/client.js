	const shareAddress = 'http://acamacho.co/asciipad?';
	const tempo = 200;
	const minChars = 3;

	var input = document.getElementById('text');
	var mobileInput = document.getElementById('mobile-input');
	var inputValue = mobileInput.value;
	var alphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
	var mobile = false;
	var characters = 0;
	var currentChar = 0;
	var charArray = [];
	var learnOverlayActive = false;
	var soundPlayers = [];
 	var soundAssets = [
	 	'sounds/808_1.wav',
	 	'sounds/bass_1.wav',
	 	'sounds/chord_1.wav',
 		'sounds/chord_2.wav',
	 	'sounds/clap_2.wav',
	 	'sounds/clap_3.wav',
	 	'sounds/clap_4.wav',
	 	'sounds/clap_5.wav',
 		'sounds/hihat_1.wav',
 		'sounds/hihat_2.wav',
 		'sounds/hihat_3.wav',
 		'sounds/kick_1.wav',
 		'sounds/kick_2.wav',
		'sounds/snare_2.wav',
		'sounds/snare_3.wav',
		'sounds/stab_1.wav',	 		 		
 		'sounds/stab_2.wav',
 		'sounds/stab_3.wav',
  		'sounds/stab_4.wav',
		'sounds/stab_5.wav',
		'sounds/tom_1.wav',
		'sounds/triangle_1.wav',
		'sounds/808_1.wav',
	 	'sounds/bass_1.wav',
	 	'sounds/chord_1.wav',
	 	'sounds/chord_2.wav'
 	]





 	for(var i = 0; i < soundAssets.length; i++){
 		var sound = new Howl({
 			src: [ soundAssets[i] ]
 		});
 		soundPlayers.push(sound);
 	}

 	function playKey(_keyIndex){
 		soundPlayers[_keyIndex].play();
 	}


	function checkKey(e) {
	    e = e || window.event;
	    var key = e.keyCode;
	  	
	  	if(key >= 65 && key <= 90){

	      var character = String.fromCharCode(key);
	      var span = document.createElement('span');
	      span.classList.add('char');
	      span.id = 'id' + characters;
	      span.innerHTML = character;
	      input.appendChild(span);

	      charArray.push(character);
	      characters += 1;
	    }

	    if(key == 46 || key == 8){	
	    	
	    	if(characters > 0){
		    	input.removeChild(input.lastChild);
		    	charArray.pop();
		    	characters--;
			}
			else{
				return;
			}
	    }

	    callGiphy();
	}

	function highlight(_id){
	  document.getElementById(_id).classList.toggle('bold');
	}

	function insertText(_text){
		var text = _text.toUpperCase();
		var chars = text.split('');

		for(var i = 0; i < chars.length; i++){
			var char = chars[i];
			var span = document.createElement('span');
			span.classList.add('char');
			span.id = 'id' + characters;
			span.innerHTML = char;
			input.appendChild(span);

			charArray.push(char);
			characters += 1;
		}

		callGiphy();
	}







 	function loopThroughMobile(){

 	  if(currentChar < charArray.length && currentChar >= 0){

	      var letterCharacter = charArray[currentChar];

	      if(alphabet.includes(letterCharacter)){
	      	 var keyIndex = letterCharacter.charCodeAt(0) - 65;
		     currentChar++; 

		     setTimeout(function(){ 
		       playKey(keyIndex);
		     }, tempo);
	      }

	  }
	  else{
	    currentChar = 0;
	    setBackground(true);
	  }
	}


	function loopThrough(){    
	  if(currentChar < characters && currentChar >= 0){

	      var id = 'id' + currentChar;
	      var letterCharacter = charArray[currentChar];
	      var keyIndex = letterCharacter.charCodeAt(0) - 65;

	      highlight(id);
	      currentChar++; 

	      setTimeout(function(){ 
	      	highlight(id) 
	      	playKey(keyIndex);
	      }, tempo);

	  }
	  else{
	    currentChar = 0;
	    setBackground(true);
	  }
	}


	function toggleShareOverlay(){
	    var overlay = document.getElementById('overlay--share');
	    overlay.classList.toggle('hidden');
	    getShareURL();
	}

	function toggleMobile(){
		var mobileApp = document.getElementById('mobile-app');
		var app = document.getElementById('app');

		mobileApp.classList.toggle('hidden');
		app.classList.toggle('hidden');
	}


	function callGiphy(){
		var text = '';
		if(charArray.length > minChars) {
			for(var i = 0; i < charArray.length; i++){
				text += charArray[i];
			}
			getGiphy(text);
		}
	}

	function getURL(){
		if(window.location.href.includes('?')){
			var text = window.location.href.split('?')[1];
			if(text.length > minChars){
				insertText(text);
			}
		}
		else{
			console.log('no text found in url');
		}
	}

	function getShareURL(){
		var shareLink = document.getElementById('share-link');
		var text = charArray.join("");
		var shareURL = shareAddress + text;
		shareLink.innerHTML = shareURL;
	}



	/* Events */

	mobileInput.addEventListener('input', function() {

	   var innerHTML = mobileInput.value;

	   if(innerHTML.length > 0)
	   {
	   	   var text = innerHTML.replace(/[&]nbsp[;]/gi," ");
		   var string = text.replace(/\s+/g, '');
		   var res = string.toUpperCase();
		   inputValue = res;

		   charArray = inputValue.split('');

		   if(inputValue.length > minChars) {
		   getGiphy(inputValue);
		}

	   }
	});


	document.getElementById('button--dismiss-share-overlay').onclick = function(){
		toggleShareOverlay();
	};

	document.getElementById('button--share').onclick = function(){
		toggleShareOverlay();
	};


	mobile = window.mobilecheck()

	document.onkeydown = checkKey;
	getURL();

	if(!mobile){
		setInterval( loopThrough, tempo);
	}
	else{
		setInterval( loopThroughMobile, tempo );
		toggleMobile();
	}

