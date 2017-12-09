"use strict";

app.controller("IncidentsCtrl", function($scope, AuthService, IncidentsService){
	const showIncidents = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			$scope.incidents = results;
		}).catch((error) => {
			console.log("error in showIncidents", error);
		});
	};

	showIncidents();
});