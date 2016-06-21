// Inside the brackets we pass our dependencies, but even if we didn't have dependencies we need the brackets
var myApp = angular.module('myApp',['ngRoute']);

// Here we will set up all of our routes
myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: 'apiController',
        templateUrl: 'index.html'
    })
    .when('/restaurants/details/:id', {
        controller: 'RestaurantsController',
        templateUrl: 'views/restaurant_details.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});
