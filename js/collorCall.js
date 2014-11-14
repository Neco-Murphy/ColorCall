var fb = new Firebase('https://colorcall.firebaseio.com/');
var timeLimit = 15; //change the timeLimit of line 92 as well
var username;
var bestScore = 0;
var foundUser = false;
var counting = false;
var locationInFb;
var playing = false;

var showTimer = function(){
	$(".dial").knob({
		'width': 140,
		'thickness': .3,
		'readOnly': true,
		'max': timeLimit,
		'fgColor': "#ff003c",
		'bgColor': "#2E2E2E",
		'displayPrevious': true,
	})
};

var askUsername = function(){
	username = prompt('Enter your username.');
	if(username){
		LoginUser(username);
		$('.username').text('User: ' + username);	
	}
};

var LoginUser = function(username){
	fb.on('value', function (snapshot) {
		//check if the user exists
		var wholedata = snapshot.val();
		for(var data in wholedata){
			var personalData = wholedata[data];
			//if yes, retrieve the best score
			if( username === personalData.username ){
				foundUser = true;
				locationInFb = data;
				bestScore = parseInt(personalData.bestscore);
			}
		};
		
		//show bestscore
		$('.bestScore').text(bestScore);
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code);
	});
}

var explainTheGame = function(){
	confirm(
		'Once the game starts, you will see the letters below.\nMatch the color of the letters by pressing the corresponding key on the keyboard.'
	);
	$('.message').text('Press enter to start!');
}
	
$(function(){
	
	askUsername();
	showTimer();

	//show playfield
	var app = new AppModel();
	//hide the quiz element first
	app.get('quiz').$el.addClass('hidden');
	var appView = new AppView({'model': app});
	$('.playContainer').append(appView.render());
	//show message
	var messageView = new MessageView();
	$('.messageContainer').append(messageView.render());

	explainTheGame();
	

//================HELPER FUNCTIONS FOR THE COUNTER===============================


	var countdown = function(){
		$('.dial').val(timeLimit).trigger('change');
		timeLimit--;
		if(timeLimit >= 0){
			setTimeout(countdown, 1000);
		} else if(timeLimit === -1){
			endCountdown();
		}
	};

	var endCountdown = function(){
	//when time is up, remove the clicked class from the start button and hide quiz element
		$('.start').removeClass('clicked');
		app.get('quiz').$el.addClass('hidden');
		//compare current score with the best score
		var currentScore = $('.score').text();

		//check the score
		if(bestScore < currentScore){
			bestScore = currentScore;
			$('.bestScore').text(bestScore);
			//add bestScore
			if(username){
				if(locationInFb){
					fb.child(locationInFb).set( { username: username, bestscore: bestScore } );
				}else{
					fb.push({ username: username, bestscore: bestScore });
				}
			}
	  }
		//show the explanation
		setTimeout(function(){
			$('.message').text('Press enter to play again!');
		}, 2000);
	  //change the playing status
		playing = false;
		//change the counting status
		counting = false;
		timeLimit = 15;
	};

//===================KEY_INPUT LISTENER=============================

	$(document).keydown(function(e){
	  var code = e.keyCode ? e.keyCode : e.which;
	  // if its enter, the game starts
	  if(code == 13 && !playing){
	  	console.log('clicked enter!')
	  	$('.message').text('');
	  	$('.start').addClass('clicked');
	  	//show quiz element
	  	app.get('quiz').$el.removeClass('hidden');
	  	$('.score').text(0);	
	  	playing = true;
	  	counting = true;
	  	countdown();

	  } else if (counting) {
		  //if its the home row keys, check the match (d:68, f:70, j:74, k:75, l:76)
		  var inputColor = (code == 68) ? 'red': ((code == 70) ? 'blue' : ((code == 74) ? 'green' : ((code == 75) ? 'yellow' : ((code == 76) ? 'purple' : undefined ))));
			if(inputColor){
				appView.showResult(inputColor);
			  appView.nextColor();
			}
	  }
	});
});

