var AppView = Backbone.View.extend({
	model: AppModel,
	className: 'playfield',
	initialize: function(){
		this.buttonsView = new ButtonsView( { 'collection': this.model.get('buttons') }) ;
		this.render();
		this.model.get('buttons').on('click', function(color){
			this.showResult(color);
			this.nextColor();
		}, this);
	},

	render: function(){
		this.$el.children().detach();
		var $message = $('h1').addClass('message');
		var $quiz = this.model.get('quiz').$el;
		return this.$el.html([$quiz, this.buttonsView.$el]);
	},

	showResult: function(color){
		//change the background color of the selected button
		var selectedButton = this.model.get('buttons').where({color: color})[0];
		selectedButton.set('clicked', true);
		setTimeout(function(){
			selectedButton.set('clicked', false);
		}, 300);
		//checkTheMatch returns true/false. with the boolean it sets the message and score
		var score = $('.score').text();
		if( this.model.checkTheMatch(color) ){
			$('.message').text('colors matched!');
			score++;
		}else{
			$('.message').text('Booooooooo!!!!');
			score--;
		}
		$('.score').text(score);
		setTimeout(function(){
			$('.message').text();
		},500);
	},

	nextColor: function(){
		this.model.setColor();
		this.render();
	}
});