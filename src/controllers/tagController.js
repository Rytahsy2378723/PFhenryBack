const {Tag} = require("../db");

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createTag = async (description) => {
  const newTag = await Tag.create(description);
  return newTag;
};

//Retorna el tag buscado por Id
const getTagById = async (id) => {
  const tag = await Tag.findByPk(id);

  return tag;
};

//Retorna todos los tags
const getAllTags = async () => {
  const tags = await Tag.findAll();
  return [...tags];
};
//Edita un registro de tag y lo devuelve editado
const editTag = async (id, updatedTag) => {
    const newTag = await Tag.update({ 
        description: updatedTag.description
    }, {
        where: {id: id}
    });
    return newTag;
};
module.exports = {createTag, getTagById, getAllTags, editTag};
