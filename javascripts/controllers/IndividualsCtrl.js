"use strict";

app.controller("IndividualsCtrl", function($location, $scope, AuthService, IndividualsService){
	//Individuals get, print to DOM, edit, delete, add functions
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


	$scope.goToAddIndividualForm = () => {
        $location.path("/individuals/new");
    };







});