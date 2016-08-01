// ROUTES
rehabApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: '/pages/list.html',
        controller: 'rehabCtrl'
      })

    .when('/info/:_id', {
        templateUrl: '/pages/info.html',
        controller: 'rehabCtrl'
      })

    .when('/partners', {
        templateUrl: '/pages/partnerlist.html',
        controller: 'partnerCtrl'
      })

       //.otherwise({redirectTo:'/'});

});
