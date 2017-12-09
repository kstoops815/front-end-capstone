"use strict";

app.service("IncidentsService", function($http, $q, FIREBASE_CONFIG, IndividualsService ) {
	const getAllIncidents = (userUid) => {
		let incidents = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/incidents.json?orderBy="reporterId"&equalTo="${userUid}"`).then((results) => {
				let fbIncidents = results.data;

				Object.keys(fbIncidents).forEach((key) => {
					fbIncidents[key].id = key;
					incidents.push(fbIncidents[key]);
				});
				console.log("IncidentsService", incidents);
				resolve(incidents);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	


return {getAllIncidents};


});