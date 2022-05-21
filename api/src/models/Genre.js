const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('genre', {
		id: {
			type: DataTypes.INTEGER,
			//type: DataTypes.ARRAY(DataTypes.STRING),

			/* type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4, */
			allowNull: false,
		},

		name: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});
};
