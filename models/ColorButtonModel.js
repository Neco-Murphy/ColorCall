var ColorButtonModel = Backbone.Model.extend({
	className: this.color,
	defaults: {
		clicked: false
	},
	template: _.template('<button class=<%= color %>><span class="key"><%= key%></span><br><%= color %></button>'),
	
	click: function(){
		this.clicked = true;
		this.trigger('click', this);
	}

});