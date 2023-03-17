const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Order', {
    date_start: {
      type: DataTypes.FLOAT,
      allowNull: false, // no sea null
    },
    time_start: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_delivery: {
        type: DataTypes.STRING,
        allowNull: false, // no sea null
      },
    time_delivery: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
    total_price: {
      type: DataTypes.FLOAT, 
      allowNull: false
    },   
    description: {
        type: DataTypes.STRING, 
        allowNull: true
      },   
  },
  {
    timestamps: false
  }
  );

};
