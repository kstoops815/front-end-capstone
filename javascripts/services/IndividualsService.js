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

	const getSingleIndividual = (individualId) => {
		return $http.get(`${FIREBASE_CONFIG.databaseURL}/individuals/${individualId}.json`);
	};

	const deleteIndividual = (individualId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/individuals/${individualId}.json`);
	};

	const updateIndividual = (individual, individualId) => {
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/individuals/${individualId}.json`, JSON.stringify(individual));
	};

return {getAllIndividuals, postIndividual, createIndividualObject, getSingleIndividual, deleteIndividual, updateIndividual};

});