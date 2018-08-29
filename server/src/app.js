var express 	   = require('express'),
	bodyParser 	   = require('body-parser'),
	methodOverride = require('method-override'),
  app 		       = express(),
  http           = require('http').Server(app),
	mongo 				 = require('mongodb'),
	mongoose			 = require('mongoose'),
	db						 = mongoose.connection,
	User 					 = require('./models/user'),
  morgan         = require('morgan'),
  cors           = require('cors'),
  io             = require('socket.io')(http);

var loginRoutes	 = require('./routes/login');
app.use(loginRoutes);

mongoose.connect('mongodb://localhost/chatApp',{ useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride("_method"));
app.use(express.static( __dirname + "/views"));
app.use(express.static( __dirname + "/public"));
app.use(cors());
app.use(morgan('combined'));

app.listen(8081,function(){
  console.log("Server started at port 8081!");
});
