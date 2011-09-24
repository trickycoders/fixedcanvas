
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

app.listen(process.env.app_port||3000);

var everyone = nowjs.initialize(app);
everyone.now.logStuff = function(msg){
    console.log(msg);
    req.flash('info', 'Message Send');
}
everyone.on('join', function () {
	console.log("Joining User " + this.user.clientId);
//  otherGroup.addUser(this.user.clientId);
});

function randOrd(){
	return (Math.round(Math.random())-0.5); 
}
function removeByElement(arrayName,arrayElement)
 {
  for(var i=0; i<arrayName.length;i++ ){ 
	  if(arrayName[i]===arrayElement)
	  arrayName.splice(i,1); 
  } 
}

everyone.on('leave', function () {
  console.log("Leaving User " + this.user.clientId);
});

everyone.now.reachBoundry = function(){
   var activeUser = this.user.clientId;
   var headY = this.now.headY;
   var headX = this.now.headX;
   var angles = this.now.angles;
   everyone.getUsers(function (users) {
	//users.sort(randOrd);
        for (var i = 0; i < users.length; i++){
		if(activeUser != users[i]){
			console.log("New User " + users[i]);
			nowjs.getClient(users[i], function() {
			    this.now.serverUpdate(headX,headY,angles);
			});
		}

	}
   });
//  everyone.now.receiveMessage(this.now.name, message);
};

app.get('/pushdata', function(req, res){
	var posX = req.param("posX","80");
	var posY = req.param("posY","80");
	if((posX != "") && (posY != "")){
		res.send("Position Updated")
	        everyone.now.getUpdate(posX,posY);
	}
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
