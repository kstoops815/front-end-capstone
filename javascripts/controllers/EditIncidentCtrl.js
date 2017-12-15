"use strict";

app.controller("EditIncidentCtrl", function($location, $routeParams, $scope, AuthService, IncidentsService, IndividualsService){
	$scope.types = ["cyber", "emotional", "physical", "sexual", "verbal", "other"];
	$scope.actionTakens = ["reported to school officials", "reported to police", "conferenced with offender", "spoke to offender's parents", "none", "other"];
	$scope.individuals = [];
	$scope.victimName = "";
	$scope.offenderName = "";
	$scope.incidentTime = new Date();
	$scope.incident = {};

	const getIncidentInfo = () => {
		IncidentsService.getSingleIncident($routeParams.id).then((incident) => {
				IndividualsService.getSingleIndividual(incident.data.victimId).then((victim) => {
					$scope.victimName = `${victim.data.firstName} ${victim.data.lastName}`;
					IndividualsService.getSingleIndividual(incident.data.offenderId).then((offender) => {
						$scope.offenderName = `${offender.data.firstName} ${offender.data.lastName}`;
						$scope.incidentTime = new Date(incident.data.time);
					});
				});
			$scope.incident = incident.data;
		}).catch((error) => {
			console.log("error in EditIncidentCtrl, getSingleIncident", error);
		});
	};	
	
	getIncidentInfo();

  $scope.editIncident = (incident, incidentId) => {
		let incidentToEdit = IncidentsService.createNewIncidentObject(incident);
		IncidentsService.updateIncident(incidentToEdit, $routeParams.id).then(() => {
			$location.path("incidents/view");
		}).catch((error) => {
			console.log("error in editIncident", error);
		});
	};

	$scope.selectType = (newType) => {
		$scope.incident.type = newType;
	};

	$scope.selectActionTaken = (actionTaken) => {
		$scope.incident.actionTaken = actionTaken;
	};
	
$scope.selectVictim = (victim) => {
	$scope.incident.victimId = victim.id;
	$scope.incident.victimName = `${victim.firstName} ${victim.lastName}`;
};

$scope.selectOffender = (offender) => {
	$scope.incident.offenderId = offender.id;
	$scope.incident.offenderName = `${offender.firstName} ${offender.lastName}`;
};

	const getIndividuals = () => {
		IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
			$scope.individuals = results;
		}).catch((error) => {
			console.log("error in show showIndividuals", error);
		});
	};

	getIndividuals();

	$scope.today = function() {
		$scope.incident.date = new Date();
	};
	
	$scope.today();

	$scope.clear = function() {
		$scope.incident.date = null;
	};


	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(2015, 1, 1),
		startingDay: 1
	};

	$scope.open2 = () => {
		$scope.popup2.opened = true;
	};

	$scope.format = 'shortDate';

	$scope.popup2 = {
		opened: false
	};


});