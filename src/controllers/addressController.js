const { Address } = require("../db");

const getAllAddress = async () => {
  const result = await Address.findAll();
  return result;
};

const getAddressById = async (id) => {
  const result = await Address.findByPk(id);
  return result ? result : (() => {throw new Error("Address not Found")})();
};

const createAddress = async (body) => {
  const { street, number, neighborhood, description, floor } = body;
  if (!street && !number) {
    throw new Error("Street and Number is requiered");
  }
  const newAddress = await Address.create({
    street,
    number,
    neighborhood,
    description,
    floor,
  });
  return newAddress;
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
