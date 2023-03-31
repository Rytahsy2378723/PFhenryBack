const {Order, OrderDetail, User} = require("../db")
const {Op} = require('sequelize')
const mercadopago = require("mercadopago");
require("dotenv").config()

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

//Crea un pedido en la BD
const createOrder = async (description, orderDetails, userId) => {
    
    //Obtengo la hora actual con el objeto Date
    const dateDelivery = new Date
    const date = dateDelivery.toLocaleString()
    const user = await User.findByPk(userId)
    let total_price = 0, i = 0
    const pref = {
        items: [],
        back_urls: {
            failure: "http://localhost:3000/",
            pending: "http://localhost:3000/",
            success: "http://localhost:3000/"
        },
        payer: {
            name: user.name,
            email: user.email
        }
    }
    //hola
    const sendPrice = Math.floor(Math.random()*4);

    while (i < orderDetails.length) {
        total_price += orderDetails[i].price
        const detailCreado = await OrderDetail.create({
            quantity: orderDetails[i].quantity,
            final_price: orderDetails[i].price
        })
        pref.items.push({
            id: 123,
            title: orderDetails[i].name,
            description: description,
            quantity: orderDetails[i].quantity,
            currency_id: "ARS",
            unit_price: orderDetails[i].price
        },
        )
        total_price = total_price + detailCreado.final_price * orderDetails[i].quantity
        i++
    }
    
    total_price += sendPrice
    const response = await mercadopago.preferences.create(pref)

    //Establesco la hora de entrega del pedido, +30 minutos
    dateDelivery.setMinutes(dateDelivery.getMinutes() + 40)

    //creo la orden
    const newOrder = await Order.create({
        date_start: date.slice(0, 9).toString(),
        time_start: date.slice(10),
        date_delivery: dateDelivery.toLocaleDateString(),
        time_delivery: dateDelivery.toLocaleTimeString(),
        total_price: total_price,
        description
    })

    orderDetails.forEach(async(order) => {
        await newOrder.setOrderDetails(order.id)
    })
    
    await newOrder.setUser(user)
    const clientInfo = await User.findByPk(newOrder.UserId);
    await sendEmailOrderConfirmation(newOrder, clientInfo);
    const mpId = response.body.id 

    return { mpId, message: "Pedido creado", time: newOrder.time_delivery }
}
//retorna todos los pedidos de la BD
const getAllOrders = async() => {
    //Traigo todos los pedidos de la base de datos
    const order = await Order.findAll({
        include: [{
            model: User,
            attributes: ['name','email'],
            as: 'User'
        },
        {
            model: OrderDetail,
            attributes: ['id','quantity','final_price'],
            as: 'OrderDetails'
        }
    ]
    })  
    return order  
}

//retorna el pedido con el id proporcionado por parametro
const getOrderById = async(id) => {
    const order = await Order.findByPk(id,{
        include: [{
            model: User,
            attributes: ['id','name','email'],
            as: 'User'
        },
        {
            model: OrderDetail,
            attributes: ['id','quantity','final_price'],
            as: 'OrderDetails'
        }
    ]
    })  
    //En caso de no encontralo
    if(!order) return { error: "Pedido no encontrado"}   
    return order 
}

//Retorna todos los pedidos de el usuario con el id pasado por parametro
const getAllOrderByUserId = async(id) => {
    const userOrder = await Order.findAll({
        where: { UserId: id },
        include: [
        {
            model: OrderDetail,
            attributes: ['id','quantity','final_price'],
            as: 'OrderDetails'
        }
    ]
    })
    if(!userOrder.length) return { error: "El usuario no tiene pedidos"}
    return userOrder
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
    getAllOrderByUserId,
    deleteOrderById
}