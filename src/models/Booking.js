const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('booking', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: false,

    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.TIME,
      allowNull: false,

    },
    costumers_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    note: {
      type: DataTypes.STRING,
      allowNull: true

    },
  },
  );

};
