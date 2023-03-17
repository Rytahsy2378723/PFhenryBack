const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // no sea null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // un unico valor,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
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

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });
};
