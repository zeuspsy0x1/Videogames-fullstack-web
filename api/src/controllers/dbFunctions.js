const axios = require('axios');
const sequelize = require('sequelize');
const Genre = require('../db').Genre;
const Videogame = require('../db').Videogame;

//traigo todos los generos y los mando a la db en [{}]
const dbGetGenres = async () => {
	try {
		let genresOrNot = await Genre.findAll();
		//console.log(genresOrNot.length);
		if (genresOrNot.length === 0) {
			/////////////////////////
			console.log('there are no genres in the db, restart the server again to get them');
			let response = await axios.get(`https://api.rawg.io/api/genres?key=246561ca3d1b44d1877ac14e4ffc9ef5`);

			let genresMap = response.data.results.map((g) => {
				return {
					id: g.id,
					name: g.name,
				};
			});

			for (let i = 0; i < genresMap.length; i++) {
				await Genre.create(genresMap[i]);
			}
		} else if (genresOrNot.length === 19) {
			console.log('All genders are already in db');
		} else if (genresOrNot.length !== 0 || genresOrNot.length !== 19) {
			console.log('There is something wrong with the number of genres fetched');
		}

		/* let genresOrNot2 = await Genre.findAll();
		console.log(genresOrNot2.length); */
	} catch (error) {
		console.log(error);
	}
};
//traigo los generos desde la db, para usarlos en la ruta /Genres
const dbFetchAllGenres = async () => {
	let genresFromDb = await Genre.findAll();
	return genresFromDb;
};
// traigo todos los juegos de la db
const getAllVideogamesFromDb = async () => {
	let videogamesFromDb = await Videogame.findAll({
		include: [
			{
				model: Genre,
				as: 'genres',
				attributes: ['name'],
			},
		],
	});

	return videogamesFromDb;
	//console.log(videogamesFromDb[0].genres[2].name); //asi los filtro en el front
};
//getAllVideogamesFromDb();

module.exports = {
	dbGetGenres,
	dbFetchAllGenres,
	getAllVideogamesFromDb,
};
