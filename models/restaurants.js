//Require what you need
var mongoose = require('mongoose');

// Restaurants schema. Not required for DB just for app
var restaurantsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Restaurants = module.exports = mongoose.model('restaurants', restaurantsSchema);

// Get restaurants

module.exports.getRestaurants = function(callback, limit){
    Restaurants.find(callback).limit(3);
}

// Get restaurant

module.exports.getRestaurantsById = function(id, callback){
    Restaurants.findById(id, callback);
}
