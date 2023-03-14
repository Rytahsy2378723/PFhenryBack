const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('usuarios', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // no sea null
    },
    email: { // vida
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true // un unico valor,
    },
    
    admin: {
      type: DataTypes.BOOLEAN, 
      allowNull: false
      // allowNull: false
    },   
    celular: {
      type: DataTypes.INTEGER,
    }
  });

};
