"use strict";

app.controller("IndividualsCtrl", function($scope, AuthService, IndividualsService){
	
	const showIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	showIndividuals();










});