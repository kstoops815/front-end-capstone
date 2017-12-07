"use strict";

app.controller("HomeCtrl", function($scope, AuthService, IndividualsService){

	$scope.individuals = [];

	const showIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			console.log("results", results);
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	showIndividuals();



});