var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
  
mongoose.connect("mongodb://test:test@ds157248.mlab.com:57248/rvs", {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }	
  }
});
 

 mongoose.connection.once('connected', function() {
     console.log("Connected to MongoLab");   
 });

 app.set('views', __dirname + '/views');
 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'ejs');

 app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static('public')); // all static files here
 var sess;

 var port = process.env.PORT || 3000; // added port

 require('./app/routes.js')(app); //all routings added here

 app.listen(port, function() {
     console.log("App Started on PORT 3000");
 });
