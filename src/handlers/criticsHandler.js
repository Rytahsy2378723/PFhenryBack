const {
  createCritic,
  getCriticById,
  getAllCritics,
  editCritic,
  deleteCritic,
} = require("../controllers/criticsController");

//Funcion que se encarga de enviar los datos en base a lo que le llega.
const getCriticsHandler = async (req, res) => {
  try {
    const response = await getAllCritics();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Funcion que se encarga de mandar lo recibido por POST para crear un nuevo registro en la BD
const createCriticHandler = async (req, res) => {
  try {
    const response = await createCritic(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del Critic.
const criticByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getCriticById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//Funcion que se encarga de, cuando se recibe un id y un nuevo plato,
//retornar el plato editado.
const editCriticHandler = async (req, res) => {
  const { id } = req.params;
  const newCritic = req.body;
  try {
    const response = await editCritic(id, newCritic);
    res.status(200).send(`Cambios aplicados sobre critica id ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Elimina Usuario por id, Permanente
const deleteCriticHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCritic(id);
    res.status(200).send(`success deleting user ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCriticsHandler,
  criticByIdHandler,
  editCriticHandler,
  createCriticHandler,
  deleteCriticHandler,
};
