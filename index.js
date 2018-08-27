//             DEPENDENCIES
var express 	   = require('express'),
	bodyParser 	   = require('body-parser'),
	methodOverride = require('method-override'),
  app 		       = express(),
  helmet         = require('helmet'),
	passport 			 = require('passport'),
	LocalStrategy	 = require('passport-local').Strategy,
  http           = require('http').Server(app),
	mongo 				 = require('mongodb'),
	mongoose			 = require('mongoose'),
	db						 = mongoose.connection,
	User 					 = require('./models/user'),
  io             = require('socket.io')(http);

//              SETUP
	mongoose.connect('mongodb://localhost/chatApp');

  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
  app.use(methodOverride("_method"));
	app.use(express.static( __dirname + "/views"));
  app.use(express.static( __dirname + "/public"));
  app.use(helmet());
	app.use(passport.initialize());
	app.use(passport.session());
	app.set("view engine", "handlebars");

//            PASSPORT SETUP
	passport.use(new LocalStrategy(
		function(username,password,done){
			User.getUserByUsername(username,function(err,user){
				if(err)
					throw err;
				if(!user){
					return done(null,false,{message: 'Unkown User'});
				}
				User.comparePassword(password,user.password,function(err,isMatch){
					if(err)
						throw err;
					if(isMatch){
						return donw(null,user);
					} else {
						return done(null,false,{message: 'Invalid Password'});
					}
				});
			});
		}));
		passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
		  User.getUserById(id, function(err, user) {
		    done(err, user);
		  });
		});
//             ROOT
  app.get("/",function(req,res){
    res.send("<h1>Workinig</h1><br><a href='/login' class='btn btn-dark'>Login</a>");
  });

//            LOGIN
	app.get("/login",function(req,res){
		res.sendFile( __dirname + "/views/login.html");
	});

	app.post("/login",passport.authenticate('local',{failureRedirect:'/login',failureFlash: true}),
	function(req,res){
			res.redirect("/" + req.user.username);
	});

//            REGISTER
	app.post("/register",function(req,res){
		var user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			username: req.body.usename
		};
		var newUser = new User(user);
		User.createUser(newUser,function(err,user){
			if(err)
				throw err;
			res.redirect("/login");
		});
	});

//            LOGOUT
	app.get("/logout",function(req,res){
		req.logout();
		res.redirect("/login");
	});

//            LISTEN
  app.listen(3000,function(){
    console.log("Server started at port 3000!");
  });
