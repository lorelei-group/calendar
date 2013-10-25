//jshint unused:false

define(function(require) {
	'use strict';
	require('component/remote/remote');

	return angular.module('lorelei-calendar-data', [
		'remote-firebase'
	])

	.factory('eventsCollection', function(remoteCollection) {
		return remoteCollection('events');
	})

	.factory('calendarEvents', function(eventsCollection) {
		var events = eventsCollection;

		function byDate(a, b) {
			return a.start - b.start;
		}

		function getEventsInRange(start, end) {
			events.sort(byDate).filter(function(event) {
				return (event.end > start && event.start < end);
			});
		}

		return {
			getRange: getEventsInRange,

		};
	})

	;
});

