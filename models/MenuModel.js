var MenuModel = Backbone.Model.extend({
	defaults:{
		'bestScore': 0,
		'score': 0
	},

	initialize: function(){
	},

	template: _.template(
		'<button class="start metal">start</button><input type="text" value="75" class="dial count"><div class="scoreBoard">
			<p class="username">User: </p>
			<p>Best Score: <span class="bestScore"></span></p>
			<p>Score: <span class="score">0</span></p>
		</div>
		')

});


