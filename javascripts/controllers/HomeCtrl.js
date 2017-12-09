"use strict";

app.controller("HomeCtrl", function($location, $scope, AuthService, IncidentsService, IndividualsService){
	//Individiuals get, edit, and delete functions
	const showIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	showIndividuals();

	$scope.editIndividualInfo = (individualId) => {
		$location.path(`/individuals/edit/${individualId}`);
	};

	//Incidents get, edit, and delete functions
	$scope.incidents = [];

	const showIncidents = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			$scope.incidents = results;
		}).catch((error) => {
			console.log("error in show showIncidents", error);
		});
	};

	showIncidents();

	$scope.goToAddIndividualForm = () => {
        $location.path("/individuals/new");
    };




});