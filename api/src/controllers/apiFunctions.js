const { Videogame, Genre } = require('../db');
const express = require('express');
const axios = require('axios');

//me traigo 1 juego por ID y lo retorno en {}
const getById = async (id) => {
	try {
		let vData = [];
		await axios.get(`https://api.rawg.io/api/games/${id}?key=246561ca3d1b44d1877ac14e4ffc9ef5`).then((res) => {
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
				vApiGenres: v.genres.map((g) => {
					return g.name;
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
//EeeeeeeeeeeN EL FOR VA i < 100
const getAllVideogames = async () => {
	try {
		let endpoints = [
			axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5`),
			//axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=2`),
			//axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=3`),
			//axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=4`),
			//axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=5`),
		];
		const api = await Promise.all(endpoints);

		let arrOfIds = [];
		let vPromisesByID = [];
		let videogamesFromApi = [];
		for (let i = 0; i < api.length; i++) {
			arr = api[i].data.results.map((v) => {
				return v.id;
			});
			arrOfIds.push(arr);
		}
		//concateno todos los ids en un solo array
		idsFlattened = arrOfIds.flat(1);

		if (idsFlattened) {
			for (let i = 0; i < 3; i++) {
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
				.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&search=${name}`)
				.then(async (res) => {
					let resultados = res.data.results;
					vByNameFiltered = resultados;
					//console.log(vByNameFiltrados);
				});
			//Creo el arr de promesas para traerlos por ID
			//EEEEEEEEEN EL FOR VA i < 15
			for (let i = 0; i < 2; i++) {
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

module.exports = {
	getById,
	getAllVideogames,
	getByName,
};
