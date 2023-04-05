const {Dishes, Tags, Section, Critic} = require("../db");
const { Op } = require("sequelize");
const {uploadImage} = require("./auxFunctions/cloudinaryUpload")
//1
//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createDish = async (obj, tagId, sectionId) => {
  console.log(tagId);
  const newRegister = {
    name:obj.name,
    image: await uploadImage(obj.image),
    description: obj.description,
    price:obj.price,
    availability:obj.availability,
    nationality:obj.nationality
  }
  const aditionalTag = await Tags.findAll({
    where: {
      id: {
        [Op.in]: tagId
      }
    }
  });
  const section = await Section.findByPk(sectionId);
  const newDish = await Dishes.create(newRegister);
  await newDish.setTags(aditionalTag, {through: "dishes_tags"});
  await newDish.setSection(section);
  return newDish;
};

//Retorna el plato buscado por Id, en conjunto con los tags correspondientes
const getDishById = async (id) => {
  const dish = await Dishes.findByPk(id, {
          include: [{
            model: Tags,
            attributes: ['description'],
            as: 'tags'
          },
          {
            model: Section,
            attributes: ['description'],
            as: 'section'
          },
          {
            model: Critic,
            attributes: ['id','title', 'content', 'score'],
            as: 'Critics'
          }
        ]
        });

  return dish;
};
//Retorna el plato buscado por nombre, con busqueda de subcadena y case insensitive
const getDishByName = async (name) => {
  const dish = await Dishes.findAll({where: 
    {name: 
    {
        [Op.substring] : name
    }}
    });

  return dish;
};
//Retorna el plato buscado por conjunto de tags, con busqueda de array
const getDishByTags = async (tags) => {
  console.log(tags);
    const dishes = await Dishes.findAll({
        include: [{
            model: Tags,
            where: {
                id: {
                    [Op.in]: tags 
                }
            },
            through: { attributes: [] } // esto es para que no se incluya la tabla intermedia en la consulta
          }]
        }
    )
    return dishes;
};

//Retorna el plato buscado por conjunto de tags, con busqueda de array
const getDishBySection = async (sectionId) => {
    const dishes = await Dishes.findAll({
        include: [{
            model: Section,
            where: {
                id: sectionId
            }},
            {
              model: Tags,
              attributes: ['id','description'],
              as: 'tags',
              through: { attributes: [] }
            },
            {
              model: Critic,
              attributes: ['id','score'],
              as: 'Critics'
            }
          ]
        }
    )
    return dishes;
};
//Retorna todos los platos
const getAllDishes = async () => {
  const dishes = await Dishes.findAll({
    include: [{
      model: Tags,
      attributes: ['id','description'],
      as: 'tags',
      through: { attributes: [] }
    },
    {
      model: Critic,
      attributes: ['id','score'],
      as: 'Critics'
    }
  ]
  });
  return dishes;
};

const logicDelete = async (id) => {
  const dishes = await Dishes.destroy({ where: { id: id }, force: false });

  return "Borrado realizado";
};
//Edita un registro de plato y lo devuelve editado, revisar si resuelve un valor undefined
const editDish = async (id, updatedDish, tagId, sectionId) => {
  const newRegister = {
    name:updatedDish.name,
    image:updatedDish.image,
    description: updatedDish.description,
    price:updatedDish.price,
    availability:updatedDish.availability,
    nationality:updatedDish.nationality
  };
  const newDish = await Dishes.findByPk(id);
  if (tagId) {
    const aditionalTag = await Tags.findAll({
      where: {
        id: {
          [Op.in]: tagId
        }
      }
    });
    await newDish.setTags(aditionalTag, {through: "dishes_tags"});
  }
  if (sectionId) {
    const section = await Section.findByPk(sectionId);
    await newDish.setSection(section);
  }
  
  await newDish.update(newRegister, {
    where: {
      id:id
    }
  });
  return newDish;
};
module.exports = {createDish, getDishById, getDishByName, getAllDishes, getDishByTags, editDish, logicDelete, getDishBySection};
