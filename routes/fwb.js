var upload = require('../models/upload');

module.exports = function(app){
	app.get('/fwb', function(req, res){
		res.render('fwb');
	});
	
}


