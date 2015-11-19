
/*
* appConfig.js : This file enables the route configuration at angular configuration phase. 
*                 checks whether user has logged in or not
*                 Initiates and bootstarp the application.
*/


shoppingApp.value('turnLoadMask', false);


/*** App Route Settings at configuration phase ***/

shoppingApp.config(function ($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider.when('/', {
        templateUrl: 'js/app/partial_views/default.html',
        controller: 'ctrlDefault'
    }).otherwise({
        redirectTo: '/'
    })
}).run(function ($rootScope, $location) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $location.path("/");
    });

});

