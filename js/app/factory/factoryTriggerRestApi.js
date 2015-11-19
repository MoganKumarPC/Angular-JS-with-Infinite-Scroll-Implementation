/*
 *   factoryTriggerRestApi.js: This Factory is responsible for invoking REST API of any kind
 *   Detached and Modularized to handle with network level service calls and return the appropriate data based on status.
 */
angularFactories.factory('factoryTriggerRestApi', ['$http', function($http) {

    var thisFactoryTriggerRestApi = this;

    /*** This method handles GET Request service calls ***/
    thisFactoryTriggerRestApi.doGET = function(url, params, data, headers, callbackSuccess, callbackFailure) {

        var transformedParams = thisFactoryTriggerRestApi.constructParams(params);
        var transformedHeaders = thisFactoryTriggerRestApi.constructParams(headers);

        $http({
            method: 'GET',
            url: url,
            params: transformedParams,
            data: data,
            headers: transformedHeaders
        }).success(function(result, status, headers, config) { // on successful data response
            if (typeof(callbackSuccess) == 'function') {
                callbackSuccess(result, status, headers, config);
            }
        }).error(function(result, status, headers, config) {
            if (typeof(callbackFailure) == 'function') {
                if (status == 0) { //check for network connectivity issues
                    //$rootScope.$broadcast("networkFailure")
                    console.log("Network Failure");
                } else { //Probably inappropriate params 
                    callbackFailure(result, status, headers, config);
                }
            }
        })
    };

    /*** This method handles POST Request service calls ***/
    thisFactoryTriggerRestApi.doPOST = function(url, params, data, headers, callbackSuccess, callbackFailure) {

        var transformedParams = thisFactoryTriggerRestApi.constructParams(params);
        var transformedHeaders = thisFactoryTriggerRestApi.constructParams(headers);

        $http({
            method: 'POST',
            url: url,
            params: transformedParams,
            data: data,
            headers: transformedHeaders
        }).success(function(result, status, headers, config) { // on successful data response
            if (typeof(callbackSuccess) == "function") {
                callbackSuccess(result, status, headers, config);
            }
        }).error(function(result, status, headers, config) {
            if (typeof(callbackFailure) == "function") {
                if (status == 0) { //check for network connectivity issues
                    console.log("Network Failure");
                } else { //Probably inappropriate params
                    callbackFailure(result, status, headers, config);
                }
            }
        })
    };

    /*** This method handles PUT Request service calls ***/
    thisFactoryTriggerRestApi.doPUT = function(url, params, data, headers, callbackSuccess, callbackFailure) {

        var transformedParams = thisFactoryTriggerRestApi.constructParams(params);
        var transformedHeaders = thisFactoryTriggerRestApi.constructParams(headers);

        $http({
            method: 'PUT',
            url: url,
            params: transformedParams,
            data: data,
            headers: transformedHeaders
        }).success(function(result, status, headers, config) { // on successful data response
            if (typeof(callbackSuccess) == "function") {
                callbackSuccess(result, status, headers, config);
            }
        }).error(function(result, status, headers, config) {
            if (typeof(callbackFailure) == "function") {
                if (status == 0) { //check for network connectivity issues
                    console.log("Network Failure");
                } else { //Probably inappropriate params
                    callbackFailure(result, status, headers, config);
                }
            }
        })
    };

    /*** This method handles DELETE Request service calls ***/
    thisFactoryTriggerRestApi.doDELETE = function(url, params, data, headers, callbackSuccess, callbackFailure) {

        var transformedParams = thisFactoryTriggerRestApi.constructParams(params);
        var transformedHeaders = thisFactoryTriggerRestApi.constructParams(headers);

        $http({
            method: 'DELETE',
            url: url,
            params: transformedParams,
            data: data,
            headers: transformedHeaders
        }).success(function(result, status, headers, config) { // on successful data response
            if (typeof(callbackSuccess) == "function") {
                callbackSuccess(result, status, headers, config);
            }
        }).error(function(result, status, headers, config) {
            if (typeof(callbackFailure) == "function") {
                if (status == 0) { //check for network connectivity issues
                    console.log("Network Failure");
                } else { //Probably inappropriate params
                    callbackFailure(result, status, headers, config);
                }
            }
        })
    };

    /*** This method constructs the customized params required to invoke service call ***/
    thisFactoryTriggerRestApi.constructParams = function(params) {

        return params;
    };

    /*** This method constructs the customized headers required to invoke service call ***/
    thisFactoryTriggerRestApi.constructHeaders = function(headers) {

        return headers;
    };

    return thisFactoryTriggerRestApi;

}]);