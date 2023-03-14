const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('detail_order', {
    quantity: {
      type: DataTypes.INTEGER, 
      allowNull: false
      // allowNull: false
    },   
    final_price: {
        type: DataTypes.FLOAT, 
        allowNull: true
        // allowNull: false
      }   
  });

};
