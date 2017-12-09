"use strict";

app.controller("DetailsCtrl", function($http, $routeParams, $scope, AuthService, FIREBASE_CONFIG, IncidentsService, IndividualsService){

	$scope.individual = {};
	$scope.incidentsAsVictim = [];
	$scope.incidentsAsOffender = [];

	const getIndividual = () => {
		IndividualsService.getSingleIndividual($routeParams.id).then((results) => {
			$scope.individual = results.data;
			console.log("in getIndividual", $scope.individual);
		}).catch((error) => {
			console.log("error in getIndividual", error);
		});
	};

	getIndividual();

	const getIncidentsForSingleIndividual = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			console.log("results", results);
			let individualBeingViewed = $routeParams.id;
			console.log("$routeParams.id", $routeParams.id);
			let allIncidents = results;
			console.log("allIncidents", allIncidents);
			allIncidents.forEach((incident) => {
				if(incident.victimId === individualBeingViewed){
					$scope.incidentsAsVictim.push(incident);
				}else if(incident.offenderId === individualBeingViewed){
					$scope.incidentsAsOffender.push(incident);
				}
			});
			console.log("$scope.incidentsAsOffender", $scope.incidentsAsOffender);
			console.log("$scope.incidentsAsVictim", $scope.incidentsAsVictim);
		}).catch((error) => {
			console.log("error in getIncidentsForSingleIndividual", error);
		});
	};


	getIncidentsForSingleIndividual();

});

