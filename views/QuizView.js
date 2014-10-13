var QuizView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},

	template: _.template('<h1 id="quiz" class="<%= color%>""><%= letter%></h1>'),

	render: function(){
		var letter = this.template(this.model);
		this.$el.html(letter);
	}
});