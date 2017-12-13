"use strict";

app.controller("IncidentsCtrl", function($location, $scope, AuthService, IncidentsService, IndividualsService){
	const showIncidents = () => {
		IncidentsService.getAllIncidents(AuthService.getCurrentUid()).then((results) => {
			results.forEach((incident) => {
				IndividualsService.getSingleIndividual(incident.victimId).then((victim) => {
					incident.victimName = `${victim.data.firstName} ${victim.data.lastName}`;
					IndividualsService.getSingleIndividual(incident.offenderId).then((offender) => {
						incident.offenderName = `${offender.data.firstName} ${offender.data.lastName}`;
					});
				});
			});
			$scope.incidents = results;
		}).catch((error) => {
			console.log("error in showIncidents", error);
		});
	};

	showIncidents();

	$scope.deleteIncident = (incidentId) => {
		IncidentsService.deleteIncident(incidentId).then(() => {
			showIncidents();
		}).catch((error) => {
			console.log("error in deleteIncident", error);
		});
	};
	
	$scope.goToAddIncidentForm = () => {
		$location.path("/incidents/new");
	};

	$scope.editIncidentInfo = (incidentId) => {
		$location.path(`/incidents/edit/${incidentId}`);
	};


});