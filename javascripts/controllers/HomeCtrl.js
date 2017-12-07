"use strict";

app.controller("HomeCtrl", function($scope, AuthService, IncidentsService, IndividualsService){

	$scope.individuals = [];

	const showIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			console.log("results", results);
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	showIndividuals();


	$scope.incidents = [];

	const showIncidents = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			console.log("results", results);
			$scope.incidents = results;
		}).catch((error) => {
			console.log("error in show showIncidents", error);
		});
	};

	showIncidents();



});