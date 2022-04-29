const { Router } = require('express');
const { getAllVideogames, getById, getByName } = require('../controllers/getAllVideogames');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/*
1. entender y practicar los joins/eager loading de sequelize.
2. Dejar hechas las rutas y los filtros -1(porque hay 1 filtro que va en REACT)
3. 
 */

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET /videogames
router.use('/', async function (req, res) {
	let v = await getAllVideogames();
	if (v) {
		res.status(200).json(v);
	} else {
		res.status(400).json({ message: 'there are no videogames' });
	}
});

//GET /videogames?name="..."
router.use('/?', async function (req, res) {
	const name = req.query.name;
	console.log(name);
	const getName = await getByName(name);
	if (!getName) {
		res.status(400).json({ message: 'there are no games with that name' });
	} else {
		res.status(200).json(getName);
	}
});
//GET /videogames/:id
router.use('/:id', async function (req, res) {
	const id = req.params.id;
	console.log(id);
	let vById = await getById(id);

	if (vById) {
		res.status(200).json(vById);
	} else {
		res.status(400).json({ message: 'there is no videogame with that id' });
	}
});

//POST /videogames
router.use('/add', async function (req, res) {
	const { videogame } = req.body;
	console.log(videogame);
});

module.exports = router;
