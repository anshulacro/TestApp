'use strict';

describe('Service: geolocation', function () {

  // load the service's module
  beforeEach(module('TestApp'));

  // instantiate service
  var geolocation;
  var deferred;
  var $scope;
  var $q;


  //Injected required modules
  beforeEach(inject(function (GetGeolocation,_$rootScope_,_$q_) {

    geolocation = GetGeolocation;
    $scope = _$rootScope_.$new();
    $q=_$q_;
    deferred = _$q_.defer();
    spyOn(geolocation, "location").and.returnValue(deferred.promise);

  }));

  it('should obtain user location', function () {

    var results; 
    deferred.resolve({coords: {latitude: 32, longitude: -96}});

    geolocation.location().then(function(data){
      console.log(data);
      results = data;
    });
    $scope.$apply();

    expect(results).toEqual({ coords : { latitude : 32, longitude : -96 } });
  });

  it('should not obtain user location when geolocation is not supported', function () {

    var results;
    deferred.reject('Geolocation is not supported');

    geolocation.location().then(function(){},function(error) {
     
      results = error;
   
   });
    $scope.$apply();
    expect(results).toEqual('Geolocation is not supported');
  
  });

  it('should not obtain user location due to rejected permission', function () {
    var results;
    deferred.reject('Errors location permission Denied');
    geolocation.location().then(function(){},function(error) {
      results = error;
    });

    $scope.$apply();
    expect(results).toEqual('Errors location permission Denied');
  });
});