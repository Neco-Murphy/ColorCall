var AppModel = Backbone.Model.extend({
	initialize: function(){
		console.log('initializing the app..');
		//define colors
		this.set('colors', ['red', 'blue', 'green', 'yellow', 'purple']);
		this.setColor();
		//creates the color buttons 
		var colorData = this.makeColorArrayOfObjects();
		this.set('buttons', new Buttons(colorData));
	},

	//generates a new color and sets the quiz property with the new QuizView
	setColor: function(){
		var colorIndex = Math.floor( Math.random() * this.get('colors').length );	
		var letterIndex = Math.floor( Math.random() * this.get('colors').length );
		while(colorIndex === letterIndex){
			letterIndex = Math.floor( Math.random() * this.get('colors').length );
		}
		var newColor =  { 
			'color': this.get('colors')[colorIndex],
			'letter': this.get('colors')[letterIndex]
		};
		this.set('quiz', new QuizView( {model: newColor} ));
	},

	//returns true or false
	checkTheMatch: function(inputColor){
		var quizColor = this.get('quiz').model.color;
		return (quizColor === inputColor);
	},

	makeColorArrayOfObjects: function(){
		var keys = ['D', 'F', 'J', 'K', 'L']
		return this.get('colors').map(function(color, i){
			return obj = { 'color': color, 'key': keys[i] };
		});
	}
});

