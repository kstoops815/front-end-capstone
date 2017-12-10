"use strict";

app.controller("NewIncidentCtrl", function($location, $scope, AuthService, IncidentsService, IndividualsService){
	$scope.newIncident = [];
	$scope.types = ["cyber", "emotional", "phsyical", "sexual", "verbal", "other"];
	$scope.actionTakens = ["reported to school officials", "reported to police", "conferenced with offender", "spoke to offender's parents"];
	$scope.names = [];

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

		const getIndividuals = () => {
			IndividualsService.getAllIndividuals(AuthService.getCurrentUid()).then((results) => {
				let allIndividuals = results;
				
				allIndividuals.forEach((individual) => {
					$scope.names.push(individual.firstName + " " + individual.lastName);
				});
			}).catch((error) => {
				console.log("error in show showIndividuals", error);
			});
		};

		getIndividuals();


});