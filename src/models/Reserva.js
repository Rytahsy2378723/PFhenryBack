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
      allowNull: false, // no sea null
    },
    time_start: { // vida
      type: DataTypes.TIME,
      allowNull: false,
      // unique: true // un unico valor,
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: false, // no sea null
    },
    time_end: { // vida
      type: DataTypes.TIME,
      allowNull: false,
      // unique: true // un unico valor,
    },
    costumers_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
      // allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
      // allowNull: false
    },
    // tableId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  },
  );

};
