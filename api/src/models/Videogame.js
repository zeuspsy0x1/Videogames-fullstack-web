const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		publishDate: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rating: {
			type: DataTypes.DECIMAL, //no float porque decimal es exacto, float es aproximado
			allowNull: false,
		},
		platforms: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
