 describe("Autocomplete-directive", function(){
  var $compile,$rootScope, $scope;
  var html,el;
  

  beforeEach(module('TestApp'));

  beforeEach(function(){
    inject(function(_$compile_,_$rootScope_){
      $compile=_$compile_;
      $scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
    });

    //Set Input to autocomplete with directive
   html = '<input type="text" placeholder="Enter your city" ng-model="city" googleplace/>';

   inject(function($compile,$rootScope){
     $scope=$rootScope.$new();
     el = angular.element(html);
     var compile_obj = $compile(el);
     compile_obj($scope);
     scope = el.scope();
     scope.$apply();
   });
  });
  
  //Test Input field
  it("should create a input text", function(){
    //compile the directive, there should be a textbox
    template = $compile(html)($scope);
    $scope.$digest();
    var templateAsHtml = template.html();
    expect(el.prop('tagName')).toBe('INPUT');
  });
  
 //check model is bind object
  it('should bind to a model object', function() {
     $rootScope.$apply("city = 'XYZ'");
     expect(el.val()).toBe('XYZ');
  });

});