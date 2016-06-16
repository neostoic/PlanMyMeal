function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

var app = angular.module('plunker', []);
app.controller('MainCtrl', ['$scope', 'MyYelpAPI', function($scope, MyYelpAPI) {
    $scope.businesses = [];
    MyYelpAPI.retrieveYelp('', function(data) {
        $scope.businesses = data.businesses;

    });

}]).factory("MyYelpAPI", function($http) {
    return {
        "retrieveYelp": function(name, callback) {
            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search?';
            var params = {
                    callback: 'angular.callbacks._0',
                    location: 'New+York',
                    oauth_consumer_key: 'OwxDelqx2pfE6itrIcGclQ', //Consumer Key
                    oauth_token: '13PpkYmq96ovcVcU0udu-EnPDBYFYxGH', //Token
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: 'food'
                };
            var consumerSecret = 'SN-UpnymuUVE8hqt7TyALjSqfUY'; //Consumer Secret
            var tokenSecret = 'qpVqU5IMkL3dbkrL7kdlKUsGV0o'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
            params['oauth_signature'] = signature;
            $http.jsonp(url, {params: params}).success(callback);
        }
    }
});
