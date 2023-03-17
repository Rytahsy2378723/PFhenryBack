const {
  createAddress,
  getAllAddress,
  getAddressById,
  deleteAddress,
} = require("../controllers/addressController");

const getAddressHandler = async (req, res) => {
  try {
    const response = await getAllAddress();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addressByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getAddressById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createAdressHandler = async (req, res) => {
  try {
    const response = await createAddress(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAddressHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAddress(id);
    res.status(200).send(`success deleting Address id: ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAddressHandler,
  addressByIdHandler,
  createAdressHandler,
  deleteAddressHandler,
};
