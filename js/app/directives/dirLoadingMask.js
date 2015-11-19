/* 
 *	dirLoadingMask.js : Delgates the Filter and sort of the products.
 */
angularDirectives.directive('dirLoadingMask', [function() {
    return {
        templateUrl: 'js/app/partial_views/loadmask.html',
        replace: true
    }
}])