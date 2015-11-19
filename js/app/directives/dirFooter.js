/* 
 *	dirFooter.js : This File handles the template of Footer.
 */
angularDirectives.directive('dirFooter', [function() {
    return {
        templateUrl: 'js/app/partial_views/footer.html',
        replace: true,
        link: function(scope, element, attributes){
        	scope.$on('staticContent', function(evt, msg){
        		scope.showingStaticData = msg.showingStaticData;
        	})
        }
    }
}])