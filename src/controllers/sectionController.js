const {Section} = require("../db");

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createSection = async (description) => {
  const newSection = await Section.create(description);
  return newSection;
};
//Retorna el tag buscado por Id
const getSectionById = async (id) => {
  const section = await Section.findByPk(id);

  return section;
};

//Retorna todos los tags
const getAllSection = async () => {
  const section = await Section.findAll();
  return section;
};
//Edita un registro de tag y lo devuelve editado
const editSection = async (id, updatedSection) => {
    const newSection = await Section.update({ 
        description: updatedSection.description
    }, {
        where: {id: id}
    });
    return newSection;
};
module.exports = {createSection, getSectionById, getAllSection, editSection};
