"use strict";

console.log("in IncidentsService.js");

app.service("IncidentsService", function($http, $q, FIREBASE_CONFIG ) {
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
				console.log("incidents in service", incidents);
			}).catch((error) => {
				reject(error);
			});
		});
	};




return {getAllIncidents};


});