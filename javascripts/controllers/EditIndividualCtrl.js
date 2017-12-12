"use strict";

app.controller("EditIndividualCtrl", function($location, $routeParams, $scope, IndividualsService) {
	
	const getIndividualInfo = () => {
		IndividualsService.getSingleIndividual($routeParams.id).then((results) => {
		$scope.individual = results.data;
		}).catch((error) => {
			console.log("error in EditIndividualCtrl, getSingleIndividual", error);
		});
	};	
	
	getIndividualInfo();

  $scope.editIndividual = (individual, individualId) => {
		let individualToEdit = IndividualsService.createIndividualObject(individual);
		IndividualsService.updateIndividual(individualToEdit, $routeParams.id).then(() => {
			$location.path("individuals/view");
		}).catch((error) => {
			console.log("error in editIndividual", error);
		});
	};

});