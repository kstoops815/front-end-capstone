"use strict";

app.controller("NewIncidentCtrl", function($location, $scope, IncidentsService){
	$scope.newIncident = [];
	$scope.types = ["cyber", "emotional", "phsyical", "sexual", "verbal", "other"];
	$scope.actionTakens = ["reported to school officials", "reported to police", "conferenced with offender", "spoke to offender's parents"];

	$scope.saveNewIncident = (incident) => {
		let newIncident = IncidentsService.createNewIncidentObject(incident);
		IncidentsService.postIncident(newIncident).then(() => {
			$location.path("incidents/view");
		}).catch((error) => {
			console.log("error in saveNewIncident", error);
		});
	};

	$scope.selectType = (type) => {
    	$scope.newIncident.type = type;
  	};

  	$scope.selectActionTaken = (actionTaken) => {
    	$scope.newIncident.actionTaken = actionTaken;
  	};






});