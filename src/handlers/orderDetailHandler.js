const {
    getOrderDetailById,
    getAllOrderDetail,
    editOrderDetail,
    createOrderDetail,
    deleteOrderDetail
  } = require("../controllers/orderDetailController");
  
  //Funcion que se encarga de retornar un detalle de pedido con el id obtenido por parametro
  const getOrderDetailByIdHandler = async (req, res) => {
    const {id} = req.params
    try {
      const response = await getOrderDetailById(id);
      if(typeof response === "string") return res.status(200).send(response)
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Funcion que se encarga de retornar todos los detalles de pedidos
  const getAllOrderDetailHandler = async (req, res) => {
    try {
      const allOrderDetail = await getAllOrderDetail()
      if(!allOrderDetail.length) return res.status(200).send("no hay detalles de pedidos")
      res.status(200).json(allOrderDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Funcion que se encarga de crear un detalle de pedido en la BD
  const createOrderDetailHandler = async (req, res) => {
    const { quantity, offerId, dishId } = req.body;
    try {
      const response = await createOrderDetail(quantity, offerId, dishId);
      if(response.error) throw new Error(response.error)
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  //Edita un detalle de pedido con el id pasado por parametro
  const editOrderDetailHandler = async (req, res) => {
    const { id } = req.params;
    const {quantity, final_price} = req.body;
    // console.log(id)
    try {
      const response = await editOrderDetail(id, quantity, final_price);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Elimina Usuario por id, Permanente
  const deleteOrderDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await deleteOrderDetail(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createOrderDetailHandler,
    getAllOrderDetailHandler,
    getOrderDetailByIdHandler,
    editOrderDetailHandler,
    deleteOrderDetailHandler,
  };
  