const { Address } = require("../db");
const { User } = require("../db");

// Trae todas las direcciones existentes
const getAllAddress = async () => {
  const result = await Address.findAll();
  return result;
};

// trae una dirreccion en particular por id
const getAddressById = async (id) => {
  const result = await Address.findByPk(id);
  return result
    ? result
    : (() => {
        throw new Error("Address not Found");
      })();
};


//crea una dirreccion relacionada con un usuario, debe recibir por BODY: userId, Streer,number
const createAddress = async (body) => {
  const { userId, street, number, neighborhood, description, floor } = body;

  await User.findByPk(userId).then(async (user) => {
    if (!user) {
      throw new Error(`404 No se encontró un usuario con id ${userId}`);
    } else if (!street && !number) {
      throw new Error("Street and Number is requiered");
    } else {
      const AddressData = await Address.create({
        street,
        number,
        neighborhood,
        description,
        floor,
      });

      await AddressData.setUser(user);
    }
  });
};

//elimina una direccion por id
const deleteAddress = async (id) => {
  await Address.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createAddress,
  getAllAddress,
  getAddressById,
  deleteAddress,
};
