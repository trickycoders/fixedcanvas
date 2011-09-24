
/**
 * Module dependencies.
 */

var express = require('express');
var nowjs = require("now");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
var everyone = nowjs.initialize(app);
everyone.now.logStuff = function(msg){
    console.log(msg);
    req.flash('info', 'Message Send');
}

app.get('/pushdata', function(req, res){
	var posX = req.param("posX","80");
	var posY = req.param("posY","80");
	if((posX != "") && (posY != "")){
		res.send("Position Updated")
	        everyone.now.getUpdate(posX,posY);
	}
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
