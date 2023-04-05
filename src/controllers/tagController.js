const {Tags} = require("../db");

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createTag = async (description) => {
  const newTag = await Tags.create(description);
  return newTag;
};

//Retorna el tag buscado por Id
const getTagById = async (id) => {
  const tag = await Tags.findByPk(id);
  return tag;
};

//Retorna todos los tags
const getAllTags = async () => {
  const tags = await Tags.findAll();
  return tags;
};
//Se encarga de eliminar un tag mediante borrado logico
const logicDelete = async (id) => {
  const tag = await Tags.destroy({ where: { id: id }, force: false });

  return "Borrado realizado";
};
//Edita un registro de tag y lo devuelve editado
const editTag = async (id, updatedTag) => {
    const newTag = await Tags.update({ 
        description: updatedTag.description
    }, {
        where: {id: id}
    });
    return newTag;
};
module.exports = {createTag, getTagById, getAllTags, editTag, logicDelete};
