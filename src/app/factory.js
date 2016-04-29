angular.module('TestApp').factory('GetGeolocation',GetGeolocation);

GetGeolocation.$inject=['$q','$window'];

function GetGeolocation($q,$window){
  return{
    location:location
  }
  function location(){
    var deferred = $q.defer();

    if(!$window.navigator) {
      deferred.reject(new Error('Geolocation is not supported'));
    } else {
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, deferred.reject);
    }

    return deferred.promise;

  }

}


angular.module('TestApp').factory('GetCity', ['$q', '$http', 'GetGeolocation', function($q, $http, GetGeolocation) {
  return {
    getCityByLatLng: function(lat, lng) {
      var deferred = $q.defer();
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            var add= results[0].formatted_address ;
            var  value=add.split(",");
            count=value.length;
            city=value[count-3];
            deferred.resolve({
              city: city
            });
          }
          else  {
            deferred.reject(new Error('Error to get city'));
          }
       }
       else {
         deferred.reject(new Error('Error to get city'));
       }
      })
      return deferred.promise;
    },

    lookup: function() {
      var deferred = $q.defer();
      var self = this;

      GetGeolocation.location().then(function(position) {
        deferred.resolve(self.getCityByLatLng(position.lat, position.lng));
      }, deferred.reject);

      return deferred.promise;
    }
  };
}]);
