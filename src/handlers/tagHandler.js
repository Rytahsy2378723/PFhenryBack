const { Router } = require("express");
const { createTag, getTagById, getAllTags, editTag, logicDelete } = require("../controllers/tagController");

//Funcion que se encarga de enviar los datos en base a lo que le llega.
const getTagsHandler = async (req, res) => {
  try {
    const response = await getAllTags();
    //Se llaman a tres funciones: getAllDishes(), getDishByName(), getDishesByTags()
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de mandar lo recibido por POST para crear un nuevo registro en la BD
const createTagHandler = async (req, res) => {
  const {description} = req.body;
  try {
    const response = await createTag({description});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del plato.
const tagByIdHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await getTagById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const tagDestroyHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await logicDelete(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id y un nuevo plato,  
//retornar el plato editado.
const editTagHandler = async (req, res) => {
  const {id} = req.params;
  const {description} = req.body;
  try {
    const response = await editTag(id, {description});
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {tagByIdHandler, createTagHandler, getTagsHandler, editTagHandler, tagDestroyHandler};
