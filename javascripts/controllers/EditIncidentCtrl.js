"use strict";

app.controller("EditIncidentCtrl", function($location, $routeParams, $scope, IncidentsService){
	const getIncidentInfo = () => {
		IncidentsService.getSingleIncident($routeParams.id).then((results) => {
			console.log("results in getIncidentInfo", results);
		$scope.incident = results.data;
		console.log("scope.incident", $scope.incident);
		}).catch((error) => {
			console.log("error in EditIncidentCtrl, getSingleIncident", error);
		});
	};	
	
	getIncidentInfo();

  $scope.editIncident = (incident, incidentId) => {
		let incidentToEdit = IncidentsService.createNewIncidentObject(incident);
		console.log("incidentToEdit", incidentToEdit);
		IncidentsService.updateIncident(incidentToEdit, $routeParams.id).then(() => {
			$location.path("incidents/view");
		}).catch((error) => {
			console.log("error in editIncident", error);
		});
	};
});