const {Plato, Tag} = require("../db");

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createDish = async (name, image, description, price, availability, nationality) => {
  const newDish = await Plato.create(name, image, description, price, availability, nationality);
  return newDish;
};

//Retorna el plato buscado por Id, en conjunto con los tags correspondientes
const getDishById = async (id) => {
  const dish = await Plato.findByPk(id, {
          include: {
            model: Tag,
            attributes: ['description'],
          },
        });

  return dish;
};
//Retorna el plato buscado por nombre, con busqueda de subcadena y case insensitive
const getDishByName = async (name) => {
  const dish = await Plato.findAll({where: 
    {name: 
    {
        [Op.substring] : name
    }}
    });

  return [...dish];
};
//Retorna el plato buscado por conjunto de tags, con busqueda de array
const getDishByTags = async (tags) => {
    const dishes = await Plato.findAll({
        include: {
            model: Tag,
            where: {
                description: {
                    [Op.in]: tags 
                }
            }
        } 
            
        }
    )
    return [...dishes];
};
//Retorna todos los platos
const getAllDishes = async () => {
  const dishes = await Pokemon.findAll();
  return [...dishes];
};
//Edita un registro de plato y lo devuelve editado
const editDish = async (id, updatedDish) => {
    const newDish = await Plato.update({ 
        name: updatedDish.name,
        image: updatedDish.image,
        description: updatedDish.description,
        price: updatedDish.price,
        availability: updatedDish.availability,
        nacionality : updatedDish.nacionality
    }, {
        where: {id: id}
    });

    return newDish;
};
module.exports = {createDish, getDishById, getDishByName, getAllDishes, getDishByTags, editDish};
