rehabApp.controller('rehabCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', '$filter', function ($scope, $http, $routeParams, $location, $window, $filter) {

  //Populate tables
var refresh = function (){
  $http.get('/api/forms').success (function (response){
   console.log(response);
    $scope.formlist = response;
    $scope.forms = "";

    });
  };


window.onload = refresh();

}]);

rehabApp.controller('partnerCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', '$filter', function ($scope, $http, $routeParams, $location, $window, $filter) {

  //Populate tables
var refresh = function (){
  $http.get('/api/partners').success (function (response){
   console.log(response);
    $scope.partnerlist = response;
    $scope.partners = "";

    });
  };


window.onload = refresh();

}]);

