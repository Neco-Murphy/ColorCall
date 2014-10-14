$(function(){
	//ask username and save it
	var username = prompt('Enter your username.');
	username ? username : '';
	$('.username').text('User: ' + username);

	// show timer
	$(".dial").knob({
		'width': 140,
		'thickness': .3,
		'readOnly': true,
		'max': 20,
		'fgColor': "#ff003c",
		'bgColor': "#2E2E2E",
		'displayPrevious': true,
	});

	var app = new AppModel();
	//hide the quiz element first
	app.get('quiz').$el.addClass('hidden');
	var appView = new AppView({'model': app});
	$('.playContainer').append(appView.render());

	// var menu = new MenuModel();
	// var menuView = new MenuView({'model': menu});
	// $('.menu').append(menuView.render());

	var messageView = new MessageView();
	$('.messageContainer').append(messageView.render());

	var bestScore = 0;
	var counting = false;

	//checking the key input
	$(document).keydown(function(e){
	  var code = e.keyCode ? e.keyCode : e.which;
	  // if its enter, the game starts
	  if(code == 13){
	  	$('.start').addClass('clicked');
	  	//show quiz element
	  	app.get('quiz').$el.removeClass('hidden');
	  	counting = true;
	  	var time = 20;
	  	var countdown = function(){
	  		$('.dial').val(time).trigger('change');
	  		time--;
	  		if(time >= 0){
	  			setTimeout(countdown, 1000);
	  		} else if(time === -1){
	  			//when time is up, remove the clicked class from the start button and hide quiz element
	  			$('.start').removeClass('clicked');
	  			app.get('quiz').$el.addClass('hidden');
	  			//compare current score with the best score
	  			var currentScore = $('.score').text();
	  			$('.score').text(0);
	  			if(bestScore < currentScore){
	  				bestScore = currentScore;
	  				$('.bestScore').text(bestScore);
	  		  }
	  			//change the counting status
	  			counting = false;
	  		}
	  	};
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
