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
        type: DataTypes.INTEGER,
        allowNull: true,
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
