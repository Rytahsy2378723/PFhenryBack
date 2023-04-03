const { OrderDetail, Dishes, Offer } = require("../db.js");

//Retorna el detalle con el id pasado
const getOrderDetailById = async (id) => {
  const order = await OrderDetail.findByPk(id,{
    include: [
      {
        model: Dishes,
        atributtes: ['name','price'],
        as: 'dish'
      },
      {
      model: Offer,
      atributtes: ['id','discount_porc'],
      as: 'Offer'
    }]
  })
//   console.log(OrderDetail)
  if(!order) return "No hay detalles con el id: " + id
  return order;
};

//Retorna todos los detalles
const getAllOrderDetail = async () => {
  const result = await OrderDetail.findAll({
    include: [
      {
        model: Dishes,
        atributtes: ['id','name','price'],
        as: 'dish'
      },
      {
      model: Offer,
      atributtes: ['id','discount_porc','availability'],
      as: 'Offer'
    }]
  })
  
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
    
    if(!newDetail.length) return "detalle no encontrado"
    return "Detalle modificado"
    };

//Crea un nuevo detalle de pedido en la BD
const createOrderDetail = async (quantity, offerId, dishId) => {
  if(!quantity) return {error: "falta la cantidad"}
  const dish = await Dishes.findByPk(dishId)
  const offer = await Offer.findByPk(offerId)
  let final_price = 0
//el precio final lo obtengo del precio del plato con el id buscado, para luego descontarle la oferta si esta disponible
  if(dish){
    final_price = dish.price
  }

  if(offer.availability){
    final_price = (final_price * offer.discount_porc) / 100
  }

  const newOrder = await OrderDetail.create(
    {
      quantity,
      final_price
    }
  );
  await newOrder.setOffer(offer)
  // await newOrder.setDishes(dish)
  // return 'detalle de pedido creado'
  return newOrder;
};
module.exports = {
  getOrderDetailById,
  getAllOrderDetail,
  deleteOrderDetail,
  editOrderDetail,
  createOrderDetail,
};


// retorna todos los detalles de pedidos de el pedido con el id pasado por parametro
// const getAllOrderDetailFromOrderId = async(id) => {
//   const order = await Order.findByPk(id)
//   if(!order) return {error: "Pedido no encontrado"}
//   if(!order.OrderDetail.length) return { error: "EL pedido no tiene detalles de pedido"}
//   return order.OrderDetail
// }