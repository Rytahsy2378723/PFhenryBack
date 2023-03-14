const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tags', {
    description: { // vida
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true // un unico valor,
    } 
  },
  {
    timestamps: false,
  });

};
