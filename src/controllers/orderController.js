const {Order} = require("../db")

const createOrder = async(total_price, description) => {
    //Obtengo la hora actual con el objeto Date
    const dateDelivery = new Date  
    const date = dateDelivery.toLocaleString()
    //Establesco la hora de entrega del pedido, +30 minutos
    dateDelivery.setMinutes(dateDelivery.getMinutes() + 30)  
    //creo la orden
    console.log(typeof date.slice(0,9), dateDelivery.toLocaleTimeString())
    await Order.create({
        date_start: date.slice(0,9),
        time_start: date.slice(10),
        date_delivery: dateDelivery.toLocaleDateString(),
        time_delivery: dateDelivery.toLocaleTimeString(),
        total_price,
        description
    })
    console.log('hola')
    return "Pedido creado"
}

const getAllOrders = async() => {
    //Traigo todos los pedidos de la base de datos
    const order = await Order.findAll()  
    return order  
}

const getOrderById = async(id) => {
    const order = await Order.findByPk(id)  
    //En caso de no encontralo
    if(!order) return { error: "Pedido no encontrado"}   
    return order 
}

const editOrder = async(id, description, total_price) => {
    //busca el pedido a modificar por id
    const order = await Order.findOne({where: { id }})
    //si lo encuentra lo modifica
    if(order){
        await Order.update({
            description,
            total_price
        },
        {
            where: {
                id
            }
        })
        return order
}
else return "Orden no encontrada"

}

module.exports = {
    createOrder, 
    getOrderById, 
    editOrder,
    getAllOrders
}