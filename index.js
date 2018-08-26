//             DEPENDENCIES
var express 	   = require('express'),
	bodyParser 	   = require('body-parser'),
	methodOverride = require('method-override'),
  app 		       = express(),
  helmet         = require('helmet'),
  http           = require('http').Server(app),
  io             = require('socket.io')(http);

//              SETUP
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
  app.use(methodOverride("_method"));
  app.use(express.static( __dirname + "/public"));
  app.use(helmet());
  app.set("view engine","html");

//             ROOT
  app.get("/",function(req,res){
    res.send("<h1>Workinig</h1>");
  });

//            LISTEN
  app.listen(3000,function(){
    console.log("Server started at port 3000!");
  });
