var fb = new Firebase('https://ozttl0bu9x5.firebaseio-demo.com/');
var timeLimit = 20;
var username;
var bestScore = 0;
var foundUser = false;
var counting = false;

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
				bestScore = personalData.bestscore;
			}
		};
		//if it didnt exist set the bestscore to 0 and save the userinfo
		if(!foundUser){
			fb.push({'username': username, 'bestscore': bestScore });
		}
		//show bestscore
		$('.bestScore').text(bestScore);
	}, function (errorObject) {
	  console.log('The read failed: ' + errorObject.code);
	});
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
			$('.score').text(0);
			console.log(bestScore, currentScore)
			if(bestScore < currentScore){
				bestScore = currentScore;
				$('.bestScore').text(bestScore);
				if(username){
					fb.push({'username': username, 'bestscore': bestScore });
				}
		  }
			//change the counting status
			counting = false;
	};

	//checking the key input
	$(document).keydown(function(e){
	  var code = e.keyCode ? e.keyCode : e.which;
	  // if its enter, the game starts
	  if(code == 13){
	  	$('.start').addClass('clicked');
	  	//show quiz element
	  	app.get('quiz').$el.removeClass('hidden');
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
