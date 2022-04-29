const axios = require('axios');
const sequelize = require('sequelize');

//traigo todos los generos y los mando a la db en [{}]
const getGenres = async () => {
	try {
		await axios
			.get(`https://api.rawg.io/api/genres?key=fa8091ff50474dd4bcc5a3a447510f85`)
			.then((res) => {
				console.log(res.data.results);
				//return res;
			});
	} catch (error) {
		console.log(error);
	}
};

//getGenres();
