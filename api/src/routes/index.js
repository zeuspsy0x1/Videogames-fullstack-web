const { Router } = require('express');
const Genre = require('../db').Genre;
const sequelize = require('../db').sequelize;
const Videogame = require('../db').Videogame;
const { getAllVideogames, getById, getByName } = require('../controllers/apiFunctions');
const { dbFetchAllGenres, getVideogameGenreByNameAndReturnId } = require('../controllers/dbFunctions');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

//GET /videogames
router.get('/allVideogames', async function (req, res) {
	let v = await getAllVideogames();
	if (v) {
		res.status(200).json(v);
	} else {
		res.status(400).json({ message: 'there are no videogames' });
	}
});

//GET /videogames?name="..."
router.get('/videogames?', async function (req, res) {
	const { name } = req.query;
	console.log(name);
	const getName = await getByName(name);
	if (!getName) {
		res.status(400).json({ message: 'there are no games with that name' });
	} else {
		res.status(200).json(getName);
	}
});
//GET /videogames/:id
router.get('/videogames/:id', async function (req, res) {
	const id = req.params.id;
	console.log(id);
	let vById = await getById(id);

	if (vById) {
		res.status(200).json(vById);
	} else {
		res.status(400).json({ message: 'there is no videogame with that id' });
	}
});

//POST /videogames/add
router.post('/videogames/add', async function (req, res) {
	try {
		const { name, rating, publishDate, description, image, vApiGenres, platforms, created } = req.body;

		const videogame = {
			name: name,
			rating: rating,
			publishDate: publishDate,
			description: description,
			image: image,
			vApiGenres: vApiGenres,
			platforms: platforms,
			created: created,
		};

		//console.log(videogame);

		let createNewVideogame = [];
		let videogameWithGenreRelationship = [];

		/* CONFIRMAR QUE NO EXISTE EL VIDEOJUEGO POR NOMBRE EN LA BASE DE DATOS
		
		let searchingVideogameIdInDb = await Videogame.findOne({
			where: { name: videogame.name },
		});

		if (searchingVideogameIdInDb) {
			res.status(400).json({ message: 'there is already a videogame with that name' });
		} else {
			createNewVideogame = await Videogame.create(videogame);

			for (let i = 0; i < videogame.vApiGenres.length; i++) {
				//console.log(vApiGenres[i]);
				videogameWithGenreRelationship[i] = await createNewVideogame.addGenre(vApiGenres[i]);
			}
			res.status(200).json({ message: 'videogame and relationships created successfully' });
		}
		
		*/

		createNewVideogame = await Videogame.create(videogame);

		for (let i = 0; i < videogame.vApiGenres.length; i++) {
			//console.log(vApiGenres[i]);
			videogameWithGenreRelationship[i] = await createNewVideogame.addGenre(vApiGenres[i]);
		}
		res.status(200).json({ message: 'videogame and relationships created successfully' });
	} catch (error) {
		console.log(error);
	}
});

//Get /genres from db
router.get('/genres', async function (req, res) {
	let gen = await dbFetchAllGenres();

	if (gen) {
		res.status(200).json(gen);
	} else {
		res.status(400).json({ message: 'the are no genres' });
	}
});

module.exports = router;
