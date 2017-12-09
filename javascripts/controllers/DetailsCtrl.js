"use strict";

app.controller("DetailsCtrl", function($http, $routeParams, $scope, AuthService, FIREBASE_CONFIG, IncidentsService, IndividualsService){

	$scope.individual = {};
	$scope.victimIncidents = [];
	$scope.offenderIncidents = [];

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
					IndividualsService.getSingleIndividual(incident.offenderId).then((results) => {
						incident.offender = results.data;
						$scope.victimIncidents.push(incident);
					});
				}else if(incident.offenderId === individualBeingViewed){
					IndividualsService.getSingleIndividual(incident.victimId).then((results) => {
						incident.victim = results.data;
						$scope.offenderIncidents.push(incident);
					});
				}
			});
			console.log("$scope.offenderIncidents", $scope.offenderIncidents);
			console.log("$scope.victimIncidents", $scope.victimIncidents);
		}).catch((error) => {
			console.log("error in getIncidentsForSingleIndividual", error);
		});
	};

	getIncidentsForSingleIndividual();

});

