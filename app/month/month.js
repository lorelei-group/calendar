//jshint unused:false

define(function(require) {
	'use strict';
	require('data/data');

	function getDayWithoutTime(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	function weekStart(day, weekStartsAt) {
		weekStartsAt = weekStartsAt || 0;
		var weekDay = day.getDay() - weekStartsAt;
		var date = day.getDate() - weekDay;
		var copy = getDayWithoutTime(day);
		copy.setDate(date);
		return copy;
	}

	function weekEnd(day, weekStartsAt) {
		var start = weekStart(day, weekStartsAt);
		start.setDate(start.getDate() + 6);
		return start;
	}

	function countDays(timestamp) {
		return timestamp / 1000 / 60 / 60 / 24;
	}

	function createWeeks(start, end, month) {
		var week = 0;
		var weeks = [];

		var count = 0;
		var current = new Date(start);
		while (current <= end) {
			if (!weeks[week])
				weeks[week] = [];

			weeks[week].push({
				date: current,
				enabled: current.getMonth() === month,
				events: [],
			});

			current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
			count++;
			if (count % 7 === 0)
				week++;
		}

		return weeks;
	}

	return angular.module('lorelei-calendar-month', [
		'lorelei-calendar-data',
	])

	.controller('MonthViewCtrl', function($scope, calendarEvents) {
		var wStart = 1;
		var today = getDayWithoutTime(new Date());
		var year = today.getFullYear();
		var month = today.getMonth();

		var monthStart = new Date(year, month, 1);
		var monthEnd = new Date(year, month + 1, 0);

		var firstDay = weekStart(monthStart, wStart);
		var lastDay = weekEnd(monthEnd, wStart);

		var events = calendarEvents.getRange(firstDay, lastDay);

		$scope.weeks = createWeeks(firstDay, lastDay, month, events);
		$scope.log = console.log.bind(console, 'CLICKED DAY');
	})

	;
});
