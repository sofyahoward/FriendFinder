
var friendsList = require('../data/friends.js');

var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app) {

	app.get('/api/friends', function(req, res){
		res.json(friendsList);
	});

	app.post('/api/friends', function(req, res){

		var bestMatch = {
			'name': 'none',
			'photo': 'none'
		};

		var userTotal = sum(req.body.scores);
		
		var friendTotal = 0;
		
			var closest = 50;
		
			for (var i = 0; i < friendsList.length; i++) {
				friendTotal = sum(friendsList[i].scores);
				var difference = Math.abs(friendTotal - userTotal);
				if ( difference <= closest ){
					closest = difference;
					bestMatch.name = friendsList[i].name;
					bestMatch.photo = friendsList[i].photo;
				};
			};

		function sum (array) {
			var total = 0;
			for (var n = 0; n < array.length; n++) {
				total += parseInt(array[n]);
			}
			return total;
		}

		
		console.log(bestMatch);
		
		res.json(bestMatch);

	});

};
