var myApp = angular.module('myApp');

// scope binds controller to the view
// http allows us to make get /post req to our API
// location deals with redirection
// routeParams allows us to get variabkes and values from forms

//This with our dependencies declared after function will work as long as we do not use the minified version of Angular, otherwise it will break
// myApp.controller('RestaurantsController', [function($scope, $http, $location, $routeParams){
//
// }]);


// For it to work with the minified version we need to set the dependencies like this as well
myApp.controller('RestaurantsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    // console.log('RestaurantsController loaded...');

    // Create a scope function to get the books
    //The scope is the binding part between the HTML (view)
    //and the JavaScript (controller). The scope is an object
    //with the available properties and methods. The scope is available for both the view and the controller.



    $scope.getRestaurants = function(){
        $http.get('/api/restaurants').success(function(response){

            $scope.restaurants = response;

            // console.log($scope);
        });
    }

    $scope.getRestaurant = function(){
        var id = $routeParams.id;
        $http.get('/api/restaurants/'+ id).success(function(response){
            $scope.restaurants = response;
        });
    }

}]);
