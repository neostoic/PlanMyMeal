//Require what you need
var express = require('express');
//Create object to represent the express application
var app = express();
//In short; body-parser extracts the entire body portion of
//an incoming request stream and exposes it on req.body as
// something easier to interface with. You don't need it per se,
//because you could do all of that yourself. However, it will most
//likely do what you want and save you the trouble.
var bodyParser = require('body-parser');
//Mongoose provides a straight-forward, schema-based solution to model
// your application data. It includes built-in type casting, validation,
//query building, business logic hooks and more, out of the box.
var mongoose = require('mongoose');
//Specify what folder to use as a static folder
app.use(express.static(__dirname+'/client'));

Restaurants =  require('./models/restaurants');

//Connect to mongoose by passing the location of the db
mongoose.connect('mongodb://localhost/mealplanner');
// Create s db object
var db = mongoose.connection;

//Set up the route for the landing page (get) is an HTTP req
//This is basically saying "when a person visits this page run this function"
app.get('/', function(req, res){
    res.send('This is the landing page');
});

//Create another route
app.get('/api/restaurants', function(req, res){
    Restaurants.getRestaurants(function(err, restaurants){
        if(err){
            throw err;
        }
        res.json(restaurants);
    });
});

//Create another route
app.get('/api/restaurants/:_id', function(req, res){
    Restaurants.getRestaurantsById(req.params._id,function(err, restaurants){
        if(err){
            throw err;
        }
        res.json(restaurants);
    });
});

app.listen(3000);
console.log('Running on port 3000');
