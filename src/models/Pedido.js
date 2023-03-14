const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    date_start: {
      type: DataTypes.DATE,
      allowNull: false, // no sea null
    },
    time_start: { // vida
      type: DataTypes.TIME,
      allowNull: false,
      // unique: true // un unico valor,
    },
    date_delivery: {
        type: DataTypes.DATE,
        allowNull: false, // no sea null
      },
    time_delivery: { // vida
        type: DataTypes.TIME,
        allowNull: false,
        // unique: true // un unico valor,
      },
    total_price: {
      type: DataTypes.FLOAT, 
      allowNull: false
      // allowNull: false
    },   
    description: {
        type: DataTypes.STRING, 
        allowNull: true
        // allowNull: false
      },   
  });

};
