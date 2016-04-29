
angular.module('TestApp').controller('CurrentLocation', function($scope, uiGmapGoogleMapApi,GetCity) {
  	GetCity.lookup().then(function(city) {
	    $scope.city = city.city;
	  }, function(err) {
  	});
});


