"use strict";

app.controller("EditIndividualCtrl", function($location, $routeParams, $scope, IndividualsService) {

	$scope.individual = [];
	$scope.races = ["American Indian or Alaska Native", "Asian", "Biracial", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White"];
	$scope.genders = ["Female", "Male", "Transgender", "Other"];
	
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

	$scope.selectRace = (race) => {
		$scope.individual.race = race;
	};

	$scope.selectGender = (gender) => {
		$scope.individual.gender = gender;
	};

});