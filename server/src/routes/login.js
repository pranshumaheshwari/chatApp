var express = require('express'),
    bodyParser 	   = require('body-parser'),
    methodOverride = require('method-override'),
    cors           = require('cors'),
    app     = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride("_method"));
app.use(cors());

const AuthenticationController = require('../controllers/AuthenticationController')

app.post('/register', AuthenticationController.register);
app.post('/login',AuthenticationController.login);

module.exports = app
