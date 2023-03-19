const {Order, OrderDetail, User} = require("../db")

//Crea un pedido en la BD
const createOrder = async(description, total_price, orderDetails) => {
    //Obtengo la hora actual con el objeto Date
    const dateDelivery = new Date  
    const date = dateDelivery.toLocaleString()

    //Establesco la hora de entrega del pedido, +30 minutos
    dateDelivery.setMinutes(dateDelivery.getMinutes() + 30)  

       //creo la orden
    const newOrder = await Order.create({
        date_start: date.slice(0,9).toString(),
        time_start: date.slice(10),
        date_delivery: dateDelivery.toLocaleDateString(),
        time_delivery: dateDelivery.toLocaleTimeString(),
        total_price,
        description
    })

 //Primero busco los detalles de pedidos con los id que hay en el arreglo orderDetail, luego seteo el detalle en el pedido creado
    orderDetails.forEach(async(id) => {
        const orderDet = await OrderDetail.findByPk(id)
        newOrder.setOrderDetails(orderDet)
    })

    return newOrder
}

//retorna todos los pedidos de la BD
const getAllOrders = async() => {
    //Traigo todos los pedidos de la base de datos
    const order = await Order.findAll()  
    return order  
}

//retorna el pedido con el id proporcionado por parametro
const getOrderById = async(id) => {
    const order = await Order.findByPk(id)  
    //En caso de no encontralo
    if(!order) return { error: "Pedido no encontrado"}   
    return order 
}

//Retorna todos los pedidos de el usuario con el id pasado por parametro
const getOrderByUserId = async(id) => {
    const findUser = User.findByPk(id)
    if(!findUser) return {error: "Usuario no encontrado"}
    if(!findUser.Order.length) return { error: "El usuario no tiene pedidos"}
    return findUser.Order
}

// Edita un pedido
const editOrder = async(id, description, total_price) => {
    //busca el pedido a modificar por id
    let order = await Order.findOne({where: { id }})
    //si lo encuentra lo modifica
    if(order){
        order = await Order.update({
            description,
            total_price
        },
        {
            where: {
                id
            }
        })
        return "Pedido modificado"
}
else return "Pedido no encontrado"
}

const deleteOrderById = async(id) => {
    const deleteOrder = await Order.findByPk(id)
    if(deleteOrder){
        await Order.destroy({ where: { id }})
    }
    else return {error: "Pedido no encontrado"}
    return "Pedido eliminado"
}

module.exports = {
    createOrder, 
    getOrderById, 
    editOrder,
    getAllOrders,
    getOrderByUserId,
    deleteOrderById
}