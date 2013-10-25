define(function(require) {
	'use strict';
	require('month/month');

	angular.module('lorelei-calendar', [
		'lorelei-calendar-month',
	])

	.value('firebaseServer', 'http://lorelei.firebaseIO.com/calendar')

	.config(function($routeProvider) {
		$routeProvider
			.when('/month', {
				templateUrl: 'app/month/month.html',
				controller: 'MonthViewCtrl'
			})
			.otherwise({
				redirectTo: '/month'
			});
	})

	.controller('MasterCtrl', function($scope, $timeout) {
		$timeout(function() {
			$scope.loaded = true;
		}, 2000);
	});

	angular.bootstrap(document.documentElement, [ 'lorelei-calendar' ]);
});
