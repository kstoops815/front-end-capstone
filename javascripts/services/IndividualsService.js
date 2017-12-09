"use strict";

app.service("IndividualsService", function($http, $q, AuthService, FIREBASE_CONFIG ) {
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
			}).catch((error) => {
				reject(error);
			});
		});
	};

	const createIndividualObject = (newIndividual) => {
		return {
			"reporterId": AuthService.getCurrentUid(),
			"firstName": newIndividual.firstName,
 			"lastName": newIndividual.lastName,
 			"age": newIndividual.age,
 			"gender": newIndividual.gender,
 			"race": newIndividual.race,
			 "notes": newIndividual.notes,
 			
		};
	};

	const postIndividual = (individual) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/individuals.json`, JSON.stringify(individual));
	};

	const getSingleInidividual = (individualId) => {
		return $http.get(`${FIREBASE_CONFIG.databaseURL}/individuals/${individualId}.json`);
	};




return {getAllIndividuals, postIndividual, createIndividualObject, getSingleInidividual};



});