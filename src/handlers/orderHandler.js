const {
  getAllOrders,
  getOrderById, 
  editOrder, 
  createOrder, 
  deleteOrderById, 
  getAllOrderByUserId } = require("../controllers/orderController");

const getAllOrderByUserIdHandler = async(req, res) => {
  const {userId} = req.params
  try {
      // console.log(userId)
    const response = await getAllOrderByUserId(userId)
    if(response.error) throw new Error(response.error)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteOrderByIdHandler = async(req, res) => {
  const {id} = req.params
  try {
    const response = await deleteOrderById(id)
    if(response.error) throw new Error(response.error)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}


// Trae todos los pedidos
const getAllOrdersHandler = async (req, res) => {
  try {
    const response = await getAllOrders()
    if(!response.length) return res.status(200).send("No hay pedidos");
    res.status(200).json(response);
  } catch (error) { 
    res.status(400).json({error: error.message});
  }
};
//Funcion que se encarga de crear un pedido de la BD con los datos obtenidos por body
const createOrderHandler = async (req, res) => {
  const {description, OrderDetails, userId} = req.body;
  try {
    const response = await createOrder(description, OrderDetails, userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
// Retorna el pedido que tenga el id obtenido por parametro
const getOrderByIdHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await getOrderById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
// Modifica el pedido con el id obtenido por parametros 
//retornar el pedido editado.
const editOrderHandler = async (req, res) => {
  const {id} = req.params;
  const {description, total_price} = req.body;
  try {
    const response = await editOrder(id, description, total_price);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  editOrderHandler, 
  createOrderHandler, 
  getAllOrdersHandler, 
  getOrderByIdHandler,
  deleteOrderByIdHandler,
  getAllOrderByUserIdHandler
};