var upload = require('../models/upload');
var handfile = require('../models/showfile');
var multer = require("multer");

var storage = multer.diskStorage({
  	destination: function (req, file, cb) {
	    cb(null, './public/upload')
  	},
  	filename: function (req, file, cb) {
	  	var str = file.originalname.split('.');
	    cb(null, Date.now()+'.'+str[1]);
  	}
})
var upload = multer({ storage: storage });


module.exports = function(app){
	app.get('/', function(req, res){
		res.render('home');
	});
	
	//上传
	app.post("/upload",upload.array("file",20),function(req,res,next){
		
		var arr = [];
		for(var i in req.files){
			
			arr.push(req.files[i].filename);
		}
		res.json({
			code:200,
			data:arr
		})
	});
	app.post('/showfile',function(req,res){
		var path = req.body.path;
		handfile.showFiles(req,res,path);
	});
	app.post('/delfile',function(req,res){
		var path = req.body.path;
		handfile.delFile(res,path);
	})

}

