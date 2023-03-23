const {
  createUser,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser,
  setAdmin,
  userLogin,
} = require("../controllers/userController");

//
const userLoginHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log("entre");
  try {
    const response = await userLogin(email, password);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Funcion que se encarga de enviar los datos en base a lo que le llega.
const getUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Funcion que se encarga de mandar lo recibido por POST para crear un nuevo registro en la BD
const createUserHandler = async (req, res) => {
  const { name, password, email, phoneNumber } = req.body;
  try {
    const datosUsuario =
      name && password && email && phoneNumber
        ? { name, password, email, phoneNumber }
        : (() => {
            throw new Error("Faltan datos del usuario");
          })();
    const response = await createUser(name, password, email, phoneNumber);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del User.
const userByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//Funcion que se encarga de, cuando se recibe un id y un nuevo plato,
//retornar el plato editado.
const editUserHandler = async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  try {
    const response = await editUser(id, newUser);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Elimina Usuario por id, Permanente
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).send(`success deleting user ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setAdminHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await setAdmin(id);
    res.status(200).send(`success, Admin user ${id} permissions changed`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userByIdHandler,
  createUserHandler,
  getUsersHandler,
  editUserHandler,
  deleteUserHandler,
  setAdminHandler,
  userLoginHandler,
};
