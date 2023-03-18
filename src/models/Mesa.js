const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('table', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    capacity: { // vida
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true // un unico valor,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // no sea null
    },
  },
    {
      timestamps: false,
    });

};
