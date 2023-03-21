const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define(
    "Critic",
    {
      //id generado automaticamente, sumando 1
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
        defaultValue: 5,
      },
    },
    {
      timestamps: true,
      classMethods: {
        destroy: function (options) {
          return this.destroy(options);
        },
      },
    }
  );
};
