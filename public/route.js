
angular.module('Myapp').config(config);
config.$inject = [ '$stateProvider', '$urlRouterProvider' ];
function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state(
        "home",
        {
            url: "/",
            controller : Winecontroller,
            templateUrl: "tpl/home.html"

        })
        .state("addwine", {
            url: "/addwine",
            templateUrl: "tpl/addwine.html",
            controller : Winecontroller,
            resolve : {
                factory : EmptyWineData,
            }

        })
        .state("about", {
            url: "/about",
            controller : Winecontroller,
            templateUrl: "tpl/about.html"
        })

        .state("wines.findone", {
            url: "/findone/:id",
            controller : Winecontroller,
            templateUrl: "tpl/addwine.html",
            resolve : {
                factory : LoadOneWineData,

            }
        })
        .state("wines", {
            url: "/wines",
            templateUrl: "tpl/showwine.html",
            controller : Winecontroller,
            resolve: {
                wines: function(Winefactory) {
                    return Winefactory.getwines();
                }
            }
        });
    $urlRouterProvider.otherwise("/");
}


angular
    .module('Myapp')
    .run(
    [
        '$rootScope',
        '$http','$stateParams',
        function($rootScope,$http,$stateParams) {

            $rootScope
                .$on(
                '$stateChangeStart',
                function(event, toState, toParams,
                         fromState, fromParams) {
                    $(".page-loading").removeClass(
                        "hidden");
                });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams)
            {
                $(".page-loading").addClass("hidden");
            });
            $rootScope
                .$on(
                '$stateChangeSuccess',
                function(event, toState, toParams,
                         fromState, fromParams) {
                    if ($stateParams.id) {
                        $rootScope.id = $stateParams.id;
                    } else {
                        $rootScope.id = "";
                    }


                });

        } ]);

            LoadOneWineData = function ($rootScope,$q,$http,$stateParams)
            {
                var deferred = $q.defer();
                    $http.get(
                        '/api/wines/'+$stateParams.id)
                        .success(function(response) {
                            deferred.resolve(response);
                            $rootScope.Onewine = response;

                        }).error(function(error) {
                            // Handle error case
                            deferred.reject(error);
                        });
                    return deferred.promise;

            }
            EmptyWineData = function ($rootScope)
            {
                $rootScope.Onewine = {};
                return $rootScope.Onewine;
            }