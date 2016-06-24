
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope', 'MyYelpAPI', '$window', function($scope, MyYelpAPI, $window) {
    $scope.total = [];
    $scope.businesses = [];
    MyYelpAPI.retrieveYelp('', function(data) {
        $scope.businesses = data.businesses
        console.log($scope.businesses)

        var array = $scope.businesses
        var random = Math.floor((Math.random() * array.length) + 1);
        // console.log(array[random])

        var result = array[random]
        console.log(result)

        if (2 > 1) {
            $scope.businesses = [result]
        }
    });

}]).factory("MyYelpAPI", function($http) {
    return {
        "retrieveYelp": function(name, callback) {
            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search?';
            var params = {
                    callback: 'angular.callbacks._0',
                    location: 'New+York',
                    oauth_consumer_key: process.env.yelp_consumer_key, //Consumer Key
                    oauth_token: process.env.yelp_token, //Token
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: 'food',
                    limit: 15
                };
            var consumerSecret = process.env.yelp_consumer_secret; //Consumer Secret
            var tokenSecret = process.env.yelp_token_secret; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
            params['oauth_signature'] = signature;
            $http.jsonp(url, {params: params}).success(callback);
        }
    }
});
