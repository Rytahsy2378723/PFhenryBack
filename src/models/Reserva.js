const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('booking', {
    date_start: {
      type: DataTypes.DATE,
      allowNull: false, // no sea null
    },
    time_start: { // vida
      type: DataTypes.TIME,
      allowNull: false,
      // unique: true // un unico valor,
    },
    date_end: {
        type: DataTypes.DATE,
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
  });

};
