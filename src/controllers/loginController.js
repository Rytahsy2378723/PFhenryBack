const { User } = require("../db");
const bcrypt = require("bcrypt"); //Hash de contrasenas (pack de npm)
const jtw = require("jsonwebtoken");
const { tokenSign } = require("./auxFunctions/generateToken");

//user login
const userLogin = async (email, password) => {
  
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`404 Las credenciales son invalidas o no coinciden`);
    }
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const tokenSession = await tokenSign(user);

      return { data: user, tokenSession };
    } else {
      // El usuario no existe o la contrasena es incorrecta, mostrar un mensaje de error
      throw new Error(`Las credenciales son invalidas o no coinciden`);
    }
  
};

module.exports = {
  userLogin,
};
