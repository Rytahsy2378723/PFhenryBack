const { Router } = require("express");
const dishes = Router();
const { createDish, getDishById, getDishByName, getAllDishes, getDishByTags, editDish, logicDelete, getDishBySection } = require("../controllers/dishController");

//Funcion que se encarga de enviar los datos en base a lo que le llega.
const getDishessHandler = async (req, res) => {
  try {
    let response = null;
    switch (true) {
      case "name" in req.query: // Si llega el nombre, entonces busca por nombre
        response = await getDishByName(req.query.name);
        console.log("entre");
        break;
      default: // Si no llega nada, devuelve todos los elementos
        response = await getAllDishes();
        break;
    }
    //Se llaman a tres funciones: getAllDishes(), getDishByName(), getDishesByTags()
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const getDishesByTagsHandler = async (req, res) => {
  try {
    const response = await getDishByTags(req.body.tags);
    //Se llaman a tres funciones: getAllDishes(), getDishByName(), getDishesByTags()
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const getDishesBySectionsHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await getDishBySection(id);
    //Se llaman a tres funciones: getAllDishes(), getDishByName(), getDishesByTags()
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de mandar lo recibido por POST para crear un nuevo registro en la BD
const createDishHandler = async (req, res) => {
  const {name, image, description, price, availability, nationality} = req.body;

  try {
    const response = await createDish({name, image, description, price, availability, nationality}, req.body.tagId, req.body.sectionId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del plato.
const getDetailHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await getDishById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id y un nuevo plato,  
//retornar el plato editado.
const editDishHandler = async (req, res) => {
  const {id} = req.params;
  const {name, image, description, price, availability, nationality} = req.body;
  try {
    const response = await editDish(id, {name, image, description, price, availability, nationality}, req.body.tagId, req.body.sectionId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del plato.
const destroyHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await logicDelete(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {getDetailHandler, createDishHandler, getDishessHandler, editDishHandler, getDishesByTagsHandler, destroyHandler, getDishesBySectionsHandler};
