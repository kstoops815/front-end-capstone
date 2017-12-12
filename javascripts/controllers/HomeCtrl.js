"use strict";

app.controller("HomeCtrl", function($location, $scope, AuthService, IncidentsService, IndividualsService){
	//Individiuals get, add, edit, and delete functions
	const showIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	showIndividuals();

	$scope.goToAddIndividualForm = () => {
		$location.path("/individuals/new");
};

	$scope.editIndividualInfo = (individualId) => {
		$location.path(`/individuals/edit/${individualId}`);
	};

	$scope.deleteIndividual = (individualId) => {
		IndividualsService.deleteIndividual(individualId).then(() => {
			showIndividuals();
		}).catch((error) => {
			console.log("error in deleteIndividual", error);
		});
	};

	//Incidents get, add, edit, and delete functions
	$scope.incidents = [];

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
			console.log("error in show showIncidents", error);
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


});