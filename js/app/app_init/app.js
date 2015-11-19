/*
* app.js : This file splits Controllers, Directives, Filters, Services, Factories as Modules. 
*			All the splitted Modules are bound together as a MattelGBIApp to achieve loosely coupled architecture.
*/

var angularExtLibraries = angular.module('angularExtLibraries',['ngRoute', 'infinite-scroll']);

var angularControllers = angular.module('angularControllers',['angularExtLibraries']);

var angularDirectives = angular.module('angularDirectives',[]);

var angularFilters = angular.module('angularFilters',[]);

var angularServices = angular.module('angularServices',[]);

var angularFactories = angular.module('angularFactories',[]);

var shoppingApp = angular.module('shoppingApp',['angularExtLibraries', 'angularControllers', 'angularFilters', 'angularServices', 'angularFactories', 'angularDirectives']);

