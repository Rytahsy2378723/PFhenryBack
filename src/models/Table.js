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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
    {
      timestamps: false,
    });

};
