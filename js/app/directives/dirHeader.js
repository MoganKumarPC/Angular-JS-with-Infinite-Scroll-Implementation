/* 
 *	dirHeader.js : This File handles the template of Header.
 */
angularDirectives.directive('dirHeader', [function() {
    return {
        templateUrl: 'js/app/partial_views/header.html',
        replace: true,
        link: function(scope, element, attributes) {
            scope.$watch('pf', function(newVal, oldVal) {
                // console.log(newVal, oldVal);
                var validFilters = {
                    filter: {

                    },
                    sortby: {

                    }
                };
                if (typeof newVal != "undefined") {
                    for (var i in newVal.filter) {
                        if (newVal.filter[i]) {
                            validFilters.filter[i] = true;
                        }
                    }
                    validFilters.sortby = newVal.sortby;
                }
                scope.pf = validFilters;
                // since header and product container does not traverse in a path (requiring Directive's controller will not work here.)
                scope.$parent.$broadcast('productFilter', scope.pf);
            }, true);
        }
    }
}])