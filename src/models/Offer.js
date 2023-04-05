const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Offer', {
    discount_porc: {
      type: DataTypes.FLOAT, 
      allowNull: false
      // allowNull: false
    },   
    availability: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
        // allowNull: false
      }   
  },
  {
    timestamps: false
  });

};
