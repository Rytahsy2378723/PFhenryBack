const { Router } = require("express");
const { createSection, getSectionById, getAllSection, editSection } = require("../controllers/sectionController");

//Funcion que se encarga de enviar los datos en base a lo que le llega.
const getSectionHandler = async (req, res) => {
  try {
    const response = await getAllSection();
    //Se llaman a tres funciones: getAllDishes(), getDishByName(), getDishesByTags()
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de mandar lo recibido por POST para crear un nuevo registro en la BD
const createSectionHandler = async (req, res) => {
  const {description} = req.body;
  try {
    const response = await createSection({description});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id, retornar el detalle del plato.
const sectionByIdHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await getSectionById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de, cuando se recibe un id y un nuevo plato,  
//retornar el plato editado.
const editSectionHandler = async (req, res) => {
  const {id} = req.params;
  const {description} = req.body;
  try {
    const response = await editSection(id, {description});
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {sectionByIdHandler, createSectionHandler, getSectionHandler, editSectionHandler};
