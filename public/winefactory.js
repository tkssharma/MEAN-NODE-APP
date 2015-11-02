

angular.module('Myapp')
    .factory('Winefactory', ['$http','$rootScope', function($http , $rootScope ) {
        var apidata = {
            getwines: function () {
                var promise = $http({
                    method: 'GET',
                    url: '/api/wines'
                });
                promise.success(function (data, status, headers, conf) {
                    $rootScope.Allwines = data;
                    return data;
                });
                return promise;
            }

        }
            return apidata;
    }]);

