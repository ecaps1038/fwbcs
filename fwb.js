var express = require('express');
//添加post请求插件
var bodyparser = require('body-parser');
//添加文件传输插件
var formidable = require('formidable');
//添加多图片上传插件
//var multer = require("multer");
//添加凭证文件
//var credentials = require('./models/credentials');

/*引入.hbs后缀文件格式*/
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
    extname: '.hbs',
	helpers: {
	       section: function(name, options){
	            if(!this._sections) this._sections = {};
	            this._sections[name] = options.fn(this);
	            return null;
	       }
	    }
});

var app = express();

//处理附件内容字节数太大
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));





//设置handlebars视图引擎
app.engine('hbs',handlebars.engine);
app.set('view engine', 'hbs');

//添加static中间价
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/data'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//汇总路由文件routes.js
require('./routes/home.js')(app);
require('./routes/fwb.js')(app);
//定制404页
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),function(){
	console.log('监听. http://localhost:' + app.get('port'));
});