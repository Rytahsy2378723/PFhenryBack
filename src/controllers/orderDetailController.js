const { OrderDetail } = require("../db.js");

//Retorna el detalle con el id pasado
const getOrderDetailById = async (id) => {
  const order = await OrderDetail.findByPk(id)
//   console.log(OrderDetail)
  if(!order) return "No hay detalles con el id: " + id
  return order;
};

//Retorna todos los detalles
const getAllOrderDetail = async () => {
  console.log(OrderDetail)
  const result = await OrderDetail.findAll()
  
  return result 
};

//Elimina el detalle de pedido con el id pasado por parametro
const deleteOrderDetail = async (id) => {
    const orderDetail = await OrderDetail.findByPk(id)
    if(orderDetail){
        await OrderDetail.destroy({
            where: { id }
        })
        return `detalle con el id: ${id} eliminado`
    }
    else return `el detalle con el id: ${id} no fue encontrado`
}
//Edita el detalle con el id pasado
const editOrderDetail = async (id,quantity, final_price, ) => {
    await OrderDetail.findByPk(id)
        const newDetail = await OrderDetail.update({
            quantity: quantity,
            final_price 
        },
        {
            where: { id }
        })
        // console.log(order)
    
    if(!newDetail.length) return "detalle no encontrado"
    return "Detalle modificado"
    };
//Crea un nuevo detalle de pedido en la BD
const createOrderDetail = async (quantity, final_price) => {
    if(!quantity) return {error: "falta la cantidad"}
    console.log(OrderDetail)
  const newOrder = await OrderDetail.create(
    {
      quantity,
      final_price
    }
  );
  return newOrder;
};
module.exports = {
  getOrderDetailById,
  getAllOrderDetail,
  deleteOrderDetail,
  editOrderDetail,
  createOrderDetail,
};
