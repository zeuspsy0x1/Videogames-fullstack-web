const { Videogame, Genre } = require('../db');
const express = require('express');
const axios = require('axios');

//me traigo 1 juego por ID y lo retorno en {}
const getById = async (id) => {
	try {
		let vData = [];
		await axios.get(`https://api.rawg.io/api/games/${id}?key=fa8091ff50474dd4bcc5a3a447510f85`).then((res) => {
			//console.log(res.data);
			let v = res.data;
			vData = {
				id: v.id,
				name: v.name,
				description: v.description_raw,
				image: v.background_image,
				publishDate: v.released,
				rating: v.rating,
				platforms: v.platforms.map((p) => {
					return p.platform.name;
				}),
			};
		});
		//console.log(vData);
		return vData;
	} catch (error) {
		console.log(error);
	}
};

//getById(69);

//me traigo todos los juegos y los retorno en un solo [{}]
const getAllVideogames = async () => {
	let endpoints = [
		axios.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85`),
		axios.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&page=2`),
		axios.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&page=3`),
		axios.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&page=4`),
		axios.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&page=5`),
	];
	const api = await Promise.all(endpoints);

	let arrOfIds = [];
	let vPromisesByID = [];
	let videogamesFromApi = [];

	try {
		for (let i = 0; i < api.length; i++) {
			arr = api[i].data.results.map((v) => {
				return v.id;
			});
			arrOfIds.push(arr);
		}
		//concateno todos los ids en un solo array
		idsFlattened = arrOfIds.flat(1);

		if (idsFlattened) {
			for (let i = 0; i < 100; i++) {
				vPromisesByID.push(getById(idsFlattened[i]));
			}
			videogamesFromApi = await Promise.all(vPromisesByID);
		}
		//console.log(videogamesFromApi);
		return videogamesFromApi;
	} catch (error) {
		console.log(error);
	}
};

//getAllVideogames();

const getByName = async (name) => {
	try {
		let vByNameFiltered = [];
		let arrOf15Ids = [];

		if (name) {
			await axios
				.get(`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&search=${name}`)
				.then(async (res) => {
					let resultados = res.data.results;
					vByNameFiltered = resultados;
					//console.log(vByNameFiltrados);
				});
			//Creo el arr de promesas para traerlos por ID
			for (let i = 0; i < 15; i++) {
				arrOf15Ids.push(getById(vByNameFiltered[i].id));
			}

			let allVideogamesWithDescription = await Promise.all(arrOf15Ids);

			return allVideogamesWithDescription;
			//console.log(vByNameFiltrados);
		} else if (!name) {
			console.log({ message: 'Theres no name in req.query' });
		}
	} catch (error) {
		console.log(error);
	}
};

//getByName('portal');

/* const getByName = async (name) => {
	try {
		let vByNameFiltrados = [];
		if (name) {
			await axios
				.get(
					`https://api.rawg.io/api/games?key=fa8091ff50474dd4bcc5a3a447510f85&search=${name}`
				)
				.then(async (res) => {
					let resultados = res.data.results;
					vByNameFiltrados = await resultados.map((v) => {
						return {
							id: v.id,
							name: v.name,
							description: v.id, //SUBQUERY CON EL ID, SE SACA Y SE PONE AQUI, HASTA QUE NO SE HAGA ESO, NO SE RETORNA DESCRIPCION, SE ESTA MANDANDO UNDEFINED EN DESCRIPTION...
							image: v.background_image,
							publishDate: v.released,
							rating: v.rating,
							platforms: v.platforms.map((p) => {
								return p.platform.name;
							}),
						};
					});
					//console.log(vByNameFiltrados);
				});

			//if (vByNameFiltrados.length > 0) {return vByNameFiltrados;} else { dbFindByName('nombre a buscar');}

			return vByNameFiltrados;
			//console.log(vByNameFiltrados);
		} else if (!name) {
			console.log({ message: 'Theres no name in req.query' });
		}
	} catch (error) {
		console.log(error);
	}
};

//getByName('portal'); */

module.exports = {
	getById,
	getAllVideogames,
	getByName,
};