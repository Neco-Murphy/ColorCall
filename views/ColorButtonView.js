var ColorButtonView = Backbone.View.extend({
	tagName: 'li',
	className: 'color',

	events: {
	  'click': function() {
	    this.model.click();
	  },
	},

	initialize: function(){
		//listen to the change of the attribute clicked. when changed, add class of selected
		this.model.on('change', function(){
			this.$el.addClass('selected');
		}, this);
	},

	render: function(){
		return this.$el.html(this.model.template(this.model.attributes));
	}
})