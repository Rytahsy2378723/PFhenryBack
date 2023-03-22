const {
    getOfferById,
    getAllOffer,
    editOffer,
    createOffer,
    deleteOffer
  } = require("../controllers/offerController");
  
  //Funcion que se encarga de retornar un detalle de pedido con el id obtenido por parametro
  const getOfferByIdHandler = async (req, res) => {
    const {id} = req.params
    try {
      const response = await getOfferById(id);
      if(typeof response === "string") return res.status(200).send(response)
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Funcion que se encarga de retornar todos los detalles de pedidos
  const getAllOfferHandler = async (req, res) => {
    try {
      const allOffer = await getAllOffer()
      if(!allOffer.length) return res.status(200).send("no hay ofertas")
      res.status(200).json(allOffer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Funcion que se encarga de crear un detalle de pedido en la BD
  const createOfferHandler = async (req, res) => {
    const { discountPorc, availability } = req.body;
    try {
      const response = await createOffer(discountPorc, availability);
      if(response.error) throw new Error(response.error)
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  //Edita un detalle de pedido con el id pasado por parametro
  const editOfferHandler = async (req, res) => {
    const { id } = req.params;
    const {discountPorc, availability} = req.body;
    try {
      const response = await editOffer(id, discountPorc, availability);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Elimina la oferta con el id pasado por parametro
  const deleteOfferhandler = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await deleteOffer(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createOfferHandler,
    getAllOfferHandler,
    getOfferByIdHandler,
    editOfferHandler,
    deleteOfferhandler,
  };
  