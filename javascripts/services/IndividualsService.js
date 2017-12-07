"use strict";

console.log("in IndividualsService.js");

app.service("IndividualsService", function($http, $q, FIREBASE_CONFIG ) {
	const getAllIndividuals = (userUid) => {
		let individuals = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/individuals.json?orderBy="reporterId"&equalTo="${userUid}"`).then((results) => {
				let fbIndividuals = results.data;
				Object.keys(fbIndividuals).forEach((key) => {
					fbIndividuals[key].id = key;
					individuals.push(fbIndividuals[key]);
				});
				resolve(individuals);
				console.log("individuals in service", individuals);
			}).catch((error) => {
				reject(error);
			});
		});
	};




return {getAllIndividuals};


});