var express        = require('express'),
    bodyParser 	   = require('body-parser'),
    methodOverride = require('method-override'),
    cors           = require('cors'),
    morgan         = require('morgan')
    app            = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride("_method"));
app.use(cors());
app.use(morgan());

const FriendsController = require('../controllers/FriendsController');

// app.post('/friends', FriendsController.getFriends);
app.post('/friends/req', FriendsController.sendReq);
app.post('/friends/req/accept', FriendsController.acceptReq);

module.exports = app
