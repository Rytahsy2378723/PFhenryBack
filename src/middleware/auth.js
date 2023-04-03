const { verifyToken } = require("../controllers/auxFunctions/generateToken");
const { User } = require("../db");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No se recibio ningun token de autorizacion");
    }
    console.log("entre aca 1");
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    console.log(tokenData);
    if (tokenData && tokenData.id) {
      console.log("entre aca 2");
      next();
    } else {
      res.status(409).send({ error: "No tienes los permisos" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const checkAdminAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await User.findByPk(tokenData.id);

    if ([].concat(roles).includes(userData.admin)) {
      next();
    } else {
      res.status(409).send({ error: "No tienes los permisos" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { checkAuth, checkAdminAuth };
