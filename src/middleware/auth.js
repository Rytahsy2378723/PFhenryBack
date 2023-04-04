const { verifyToken } = require("../controllers/auxFunctions/generateToken");
const { User } = require("../db");

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Error("No se recibio ningun token de autorizacion");
  }

  const token = req.headers.authorization.split(" ").pop();
  let newToken = token.substring(1, token.length - 1);
  const tokenData = await verifyToken(newToken);

  if (tokenData && tokenData.id) {
    next();
  } else {
    res.status(409).send({ error: "No tienes los permisos" });
  }
};

const checkAdminAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    let newToken = token.substring(1, token.length - 1);

    const tokenData = await verifyToken(newToken);
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

const blockParamsId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = req.headers.authorization.split(" ").pop();
    let newToken = token.substring(1, token.length - 1);
    const tokenData = await verifyToken(newToken);

    console.log(tokenData.id, id, parseInt(id));

    if (tokenData.admin === true) {
      return next();
    }
    if (tokenData.id === parseInt(id)) {
      console.log("Exito");
      return next();
    }
    res.status(409).send({ error: "No tienes los permisos" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { checkAuth, checkAdminAuth, blockParamsId };
