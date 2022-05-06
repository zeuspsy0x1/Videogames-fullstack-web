const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: true,
			primaryKey: true,
			autoincrement: true,
		},
		apiOrInputId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
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
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
		vApiGenres: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
	});
};
