const { Address } = require("../db");
const { User } = require("../db");

const getAllAddress = async () => {
  const result = await Address.findAll();
  return result;
};

const getAddressById = async (id) => {
  const result = await Address.findByPk(id);
  return result
    ? result
    : (() => {
        throw new Error("Address not Found");
      })();
};

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
