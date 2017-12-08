"use strict";

app.controller("NewIndividualCtrl", function($location, $scope, IndividualsService){
	
	$scope.newIndividual = [];
	$scope.button = "";
	$scope.races = ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White"];
	$scope.genders = ["female", "male", "transgender", "other"];

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