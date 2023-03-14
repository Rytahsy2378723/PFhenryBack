const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('token', {
    auth_token: { // vida
      type: DataTypes.STRING,
      allowNull: true,
      // unique: true // un unico valor,
    },
    pay_token: {
        type: DataTypes.STRING,
        allowNull: true, // no sea null
    }   
  });

};
