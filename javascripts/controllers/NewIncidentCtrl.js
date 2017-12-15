"use strict";

app.controller("NewIncidentCtrl", function($location, $scope, AuthService, IncidentsService, IndividualsService){
	$scope.newIncident = {};
	$scope.types = ["cyber", "emotional", "physical", "sexual", "verbal", "other"];
	$scope.actionTakens = ["reported to school officials", "reported to police", "conferenced with offender", "spoke to offender's parents", "none", "other"];
	$scope.individuals = [];
	$scope.victimName = "";
	$scope.offenderName = "";
	$scope.incidentTime = new Date();

	$scope.saveNewIncident = () => {
		$scope.newIncident.time = $scope.incidentTime;
		let newIncident = IncidentsService.createNewIncidentObject($scope.newIncident);
		IncidentsService.postIncident(newIncident).then(() => {
			$location.path("/incidents");
		}).catch((error) => {
			console.log("error in saveNewIncident", error);
		});
	};

	$scope.selectType = (newType) => {
    	$scope.newIncident.type = newType;
		};

  	$scope.selectActionTaken = (actionTaken) => {
    	$scope.newIncident.actionTaken = actionTaken;
		};
		
	$scope.selectVictim = (victim) => {
		$scope.newIncident.victimId = victim.id;
		$scope.victimName = `${victim.firstName} ${victim.lastName}`;
	};

	$scope.selectOffender = (offender) => {
		$scope.newIncident.offenderId = offender.id;
		$scope.offenderName = `${offender.firstName} ${offender.lastName}`;
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
			$scope.newIncident.date = new Date();
			console.log("new Date", $scope.newIncident.date);

		};
		$scope.today();
	
		$scope.clear = function() {
			$scope.newIncident.date = null;
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