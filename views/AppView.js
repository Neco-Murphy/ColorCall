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
		var $quiz = this.model.get('quiz').$el;
		return this.$el.html([$quiz, this.buttonsView.$el]);
	},

	showResult: function(color){
		//change the background color of the selected button
		var selectedButton = this.model.get('buttons').where({color: color})[0];
		selectedButton.set('clicked', true);
		//checkTheMatch returns true/false and the line below sets the message
		var message = this.model.checkTheMatch(color) ? 'colors matched!' : 'Booooooooo!!!!';
		
		alert(message);
	},

	nextColor: function(){
		this.model.setColor();
		this.render();
	}
});