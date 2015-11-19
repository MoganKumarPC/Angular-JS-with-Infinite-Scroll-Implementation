/*
 * serLoadingMask.js : This service is responsible for loading and hiding loading mask. 
 */
angularServices.service('serLoadingMask', function($rootScope) {
    var thisloadingMask = this;

    /*** For showing Loading Mask ***/
    thisloadingMask.showLoadMask = function() {
        thisloadingMask.apiCallsCounter++;
        $rootScope.turnLoadMask = true;
    };

    /*** For hiding Loading Mask ***/
    thisloadingMask.hideLoadMask = function() {
        thisloadingMask.apiCallsCounter--;
        if (thisloadingMask.apiCallsCounter == 0) {
            $rootScope.turnLoadMask = false;
            //$rootScope.$digest();
        }
    };

    /*** Intialization for Loading Mask ***/
    thisloadingMask.init = function() {
        thisloadingMask.apiCallsCounter = 0;
        //$rootScope.turnLoadMask = true;
    };

    /*** Service Instantiates Here ***/
    thisloadingMask.init();
});