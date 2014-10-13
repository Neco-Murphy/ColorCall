var ButtonsView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(){
		this.render();
		$('.playField').append(this.$el);
	},
  
  render: function(){
  	this.$el.children().detach();
  	this.$el.append(
  		this.collection.models.map(function(button){
  			return new ColorButtonView({model: button}).render();
  		})
  	)
  }
});