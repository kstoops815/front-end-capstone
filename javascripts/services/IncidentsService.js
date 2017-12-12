"use strict";

app.service("IncidentsService", function($http, $q, AuthService, FIREBASE_CONFIG, IndividualsService ) {
	const getAllIncidents = (userUid) => {
		let incidents = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/incidents.json?orderBy="reporterId"&equalTo="${userUid}"`).then((results) => {
				let fbIncidents = results.data;
				Object.keys(fbIncidents).forEach((key) => {
					fbIncidents[key].id = key;
					incidents.push(fbIncidents[key]);
				});
				resolve(incidents);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	const createNewIncidentObject = (newIncident) => {
		return {
			"reporterId": AuthService.getCurrentUid(),
			"type": newIncident.type,
			"date": newIncident.date,
			"time": newIncident.time,
			"description": newIncident.description,
			"actionTaken": newIncident.actionTaken,
			"actionNotes": newIncident.actionNotes,
			"victimId": newIncident.victimId,
			"offenderId": newIncident.offenderId
		};
	};

	const postIncident = (incident) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/incidents.json`, JSON.stringify(incident));
	};

	const deleteIncident = (incidentId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/incidents/${incidentId}.json`);
	};

	const updateIncident = (incident, incidentId) => {
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/incidents/${incidentId}.json`, JSON.stringify(incident));
	};


return {getAllIncidents, createNewIncidentObject, postIncident, deleteIncident, updateIncident};

});