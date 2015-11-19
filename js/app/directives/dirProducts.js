/* 
 *	dirProducts.js : This File wraps the whole Products.
 */
angularDirectives.directive('dirProducts', ['factoryTriggerRestApi', 'serLoadingMask', 'serStaticData', '$filter', function(factoryTriggerRestApi, serLoadingMask, serStaticData, $filter) {
    return {
        templateUrl: 'js/app/partial_views/products.html',
        replace: true,
        link: function(scope, element, attribute) {

            scope.numberOfProductsToShow = 9;

            scope.numberOfProductsAlreadyShown = 0;

            scope.resultData = [];

            scope.clonedResultData = [];

            scope.renderResultData = [];

            scope.categories = {};

            scope.iscrollBusy = false;

            /** Handles infinite scroll to load more products **/
            scope.iscrollNextpage = function() {
                // console.log('nextPage...');
                var plus9 = (scope.renderResultData.length + scope.numberOfProductsToShow < scope.resultData.length) ? scope.renderResultData.length + scope.numberOfProductsToShow : scope.resultData.length;
                for (var i = scope.renderResultData.length; i < plus9; i++) {
                    scope.renderResultData.push(scope.resultData[i]);
                }
            };

            /** Handles the Product Filter and Sort Changes and reflect the view **/
            scope.$on('productFilter', function(evt, msg) {
                // console.log(evt, msg);
                scope.renderResultData = [];
                scope.resultData = [];
                scope.doFilter(msg.filter);
                scope.doSort(msg.sortby);
                scope.slicedData = scope.resultData.slice(0, Math.min(scope.numberOfProductsToShow, scope.resultData.length))
                scope.renderResultData = scope.renderResultData.concat(scope.slicedData);
                scope.numberOfProductsAlreadyShown = Math.min(scope.numberOfProductsToShow, scope.resultData.length);
                console.log(scope.renderResultData);
            });

            /** Does not require separate filter as the products are already categorized in the processData() Method **/
            scope.doFilter = function(pf) {
                for (var i in pf) {
                    scope.resultData = scope.resultData.concat(scope.categories[i]);
                }
                if (Object.keys(pf).length == 0) {
                    scope.resultData = scope.clonedResultData;
                }
            };

            scope.doSort = function(pf) {
                switch (pf) {
                    case 'lp':
                        {
                            scope.resultData = $filter('orderBy')(scope.resultData, 'price', false)
                            break;
                        }
                    case 'hp':
                        {
                            scope.resultData = $filter('orderBy')(scope.resultData, 'price', true)
                            break;
                        }
                    case 'ls':
                        {
                            scope.resultData = $filter('orderBy')(scope.resultData, 'score', false)
                            break;
                        }
                    case 'hs':
                        {
                            scope.resultData = $filter('orderBy')(scope.resultData, 'score', true)
                            break;
                        }
                }
            };

            /** segregates category based products while processing the data received from REST API **/
            scope.processData = function() {
                scope.resultData.filter(function(val, indx, arr) { // avoids unnecessary loop or prevents O(n2) Time, achives O(n)
                    if (typeof scope.categories[val.cat] == "undefined") {
                        scope.categories[val.cat] = [];
                    }
                    scope.categories[val.cat].push(val);
                });
                console.log('categories based filter', scope.categories);
            }

            /** On REST API Sucess **/
            scope.sucessGetProducts = function(data) {
                console.log("Sucessfully fetched data ", data);
                if(angular.isDefined(data) && angular.isDefined(data.products) && data.products.length > 0){
                    scope.resultData = data.products;
                    scope.clonedResultData = data.products;
                    scope.slicedData = scope.resultData.slice(scope.numberOfProductsAlreadyShown, Math.min(scope.numberOfProductsToShow, scope.resultData.length))
                    scope.renderResultData = scope.renderResultData.concat(scope.slicedData);
                    scope.numberOfProductsAlreadyShown = scope.numberOfProductsAlreadyShown + Math.min(scope.numberOfProductsToShow, scope.resultData.length);
                    serLoadingMask.hideLoadMask();
                    scope.processData();
                }
                else{
                    scope.getStaticProducts();
                }   
            };

            /** On REST API Failure **/
            scope.failureGetProducts = function(err) {
                serLoadingMask.hideLoadMask();
                scope.getStaticProducts();
                console.log("Error while fetching data ", err);
            };

            /** This method Activation helps in calling the REST API network Data **/
            scope.getProducts = function() {
                scope.showingStaticData = false;
                factoryTriggerRestApi.doGET('https://test-prod-api.herokuapp.com/products', '', '', '', scope.sucessGetProducts, scope.failureGetProducts);
                serLoadingMask.showLoadMask();
            }

            //uncommenting this method, needs commenting the scope.getStaticProducts() Method
            scope.getProducts();
            /** **** **** **** **** **** **/

            /** This method Activation helps in calling the static JSON Data **/
            scope.getStaticProducts = function() {
                scope.showingStaticData = true;
                // since footer and product container does not traverse in a path (requiring Directive's controller will not work here.)
                scope.$emit('staticContent', {showingStaticData:scope.showingStaticData});

                scope.resultData = serStaticData.data.products;
                scope.clonedResultData = serStaticData.data.products;
            
                scope.slicedData = scope.resultData.slice(scope.numberOfProductsAlreadyShown, Math.min(scope.numberOfProductsToShow, scope.resultData.length))
                scope.renderResultData = scope.renderResultData.concat(scope.slicedData);
                scope.numberOfProductsAlreadyShown = scope.numberOfProductsAlreadyShown + Math.min(scope.numberOfProductsToShow, scope.resultData.length);
                
                scope.processData();
            }

            //uncommenting this method, needs commenting the scope.getProducts() Method
            //scope.getStaticProducts();

            /** **** **** **** **** **** **/
        }
    }
}])