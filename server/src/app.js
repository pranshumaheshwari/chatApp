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
  cors           = require('cors');

var loginRoutes	 = require('./routes/login');
var friendsRoutes	 = require('./routes/friends');
app.use(loginRoutes);
app.use(friendsRoutes);

mongoose.connect('mongodb://pranshu:Pranshu123@ds044787.mlab.com:44787/chat-app',{ useNewUrlParser: true })
						.then(_ => {console.log('Connected To DB')})
						.catch(err => {console.error(`There has been an error\n${err}`)});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride("_method"));
app.use(express.static( __dirname + "/views"));
app.use(express.static( __dirname + "/public"));
app.use(cors());
app.use(morgan('combined'));

const server = app.listen(8081,function(){
  console.log("Server started at port 8081!");
});

let io = require('socket.io')(server);

io.on('connection', socket => {
	console.log(socket.id);
	socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data);
    });
});
