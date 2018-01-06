"use strict";

app.controller("DetailsCtrl", function($http, $location, $routeParams, $scope, AuthService, FIREBASE_CONFIG, IncidentsService, IndividualsService){

	$scope.individual = {};
	$scope.victimIncidents = [];
	$scope.offenderIncidents = [];

	//get single individual information
	const getIndividual = () => {
		IndividualsService.getSingleIndividual($routeParams.id).then((results) => {
			$scope.individual = results.data;
		}).catch((error) => {
			console.log("error in getIndividual", error);
		});
	};

	getIndividual();

	//Get all incidents that a single person is involved in either as the offender or the victim
	const getIncidentsForSingleIndividual = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			let individualBeingViewed = $routeParams.id;
			let allIncidents = results;
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
		}).catch((error) => {
			console.log("error in getIncidentsForSingleIndividual", error);
		});
	};

	getIncidentsForSingleIndividual();

	$scope.returnToIndividualsPage = () => {
		$location.path("/individuals");
	};

	$scope.returnToMyDashboard = () => {
		$location.path("/home");
	};
	
});

