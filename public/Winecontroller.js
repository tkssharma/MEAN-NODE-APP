
angular.module('Myapp').controller(Winecontroller,"Winecontroller");

Winecontroller.$inject = ['$http','$scope','$state','$rootScope']
function Winecontroller($http,$scope,$state,$rootScope)
{
    $scope.saveWine = function(data)
    {
       alert(data);
        if(data._id != null) {
            var promise = $http({
                method: 'PUT',
                url: '/api/wines/' + data._id,
                data : data
            });
            promise.success(function (data, status, headers, conf) {
                var http = $http({
                    method: 'GET',
                    url: '/api/wines'
                });
                http.success(function (data, status, headers, conf) {
                    $rootScope.Allwines = data;
                    $state.transitionTo("wines");
                });

            });

        }
        else
        {
            var promise = $http({
                method: 'POST',
                url: '/api/wines/',
                data : data
            });
            promise.success(function (data, status, headers, conf) {
                $rootScope.Onewine = {};
                $state.transitionTo("wines");
            });

        }
    }

    $scope.DeleteWine = function(data)
    {
        var http = $http({
            method: 'DELETE',
            url: '/api/wines/' + data._id
        });
        http.success(function (data, status, headers, conf) {
            $rootScope.Onewine = {};
            $state.transitionTo("wines");
        });
    }

}