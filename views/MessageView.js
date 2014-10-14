var MessageView = Backbone.View.extend({
	tagName: 'h2',
	className: 'message',

	initialize: function(){
		this.render();
	},

	render: function(){
		return this.$el;
	},

	showMessage: function(message){
		this.$el.text(message);
		this.render();
		setTimeout(function(){
			this.render();
		}, 500);
	}

});
