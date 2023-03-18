const { Critic } = require("../db");
const bcrypt = require("bcrypt"); //Hash de contrasenas (pack de npm)

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createCritic = async (criticObj) => {
  const { tittle, content, score } = criticObj;
  const newCritic = await Critic.create({
    tittle,
    content,
    score,
  });
  return newCritic;
};

//Retorna la critic buscado por Id
const getCriticById = async (id) => {
  const result = await Critic.findByPk(id);
  return result
    ? result
    : (() => {
        throw new Error("Critic not Found");
      })();
};

//Retorna todos los critics
const getAllCritics = async () => {
  const critics = await Critic.findAll();
  return [...critics];
};

//Edita un registro de user y lo devuelve editado
const editCritic = async (id, updatedCritic) => {
  if (id) {
    const { tittle, content, score } = updatedCritic;

    const newCritic = await Critic.update(
      {
        tittle,
        content,
        score,
      },
      {
        where: { id: id },
      }
    );
    return newCritic;
  }
  throw new Error("Critic id required");
};

//Elimina un Critic por Id
const deleteCritic = async (id) => {
  await Critic.destroy({
    where: {
      id: id,
    },
  });
};

//Interruptor de estado Admin para usuario

module.exports = {
  createCritic,
  getCriticById,
  getAllCritics,
  editCritic,
  deleteCritic,
};
