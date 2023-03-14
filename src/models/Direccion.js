const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('adress', {
    street: {
      type: DataTypes.STRING,
      allowNull: false, // no sea null
    },
    number: { // vida
      type: DataTypes.INTEGER,
      allowNull: true,
      // unique: true // un unico valor,
    },
    neighborhood: { // ataque
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { // defending
      type: DataTypes.STRING,
      allowNull: true,
    },
    floor: { // velocidad
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
  });
};
