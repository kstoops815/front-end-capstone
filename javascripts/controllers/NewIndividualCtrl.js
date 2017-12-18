"use strict";

app.controller("NewIndividualCtrl", function($location, $scope, IndividualsService){
	
	$scope.newIndividual = [];
	$scope.races = ["American Indian or Alaska Native", "Asian", "Biracial", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White"];
	$scope.genders = ["Female", "Male", "Transgender", "Other"];

	$scope.saveNewIndividual = (individual) => {
		let newIndividual = IndividualsService.createIndividualObject(individual);
		IndividualsService.postIndividual(newIndividual).then(() => {
			$location.path("individuals/view");
		}).catch((error) => {
			console.log("error in saveNewIndividual", error);
		});
	};

	$scope.selectRace = (race) => {
    	$scope.newIndividual.race = race;
  	};

  	$scope.selectGender = (gender) => {
    	$scope.newIndividual.gender = gender;
  	};

});