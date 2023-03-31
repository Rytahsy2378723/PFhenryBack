const nodemailer = require("nodemailer");
const { EMAIL, PASS_EMAIL } = process.env;


const sendEmailDeleteOrderConfirmation = async (orderInfo, clientInfo) => {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: EMAIL,
            pass: PASS_EMAIL
        },
        tls: {
            rejectUnauthorized: false
        },
    }
    const transport = nodemailer.createTransport(config);
    const textMessage = "Hola " + clientInfo.name + ", tu pedido que seria " +
        "entregado el " + orderInfo.date_delivery + " a las " + orderInfo.time_delivery + " y tendria un costo de $" +
        orderInfo.total_price + ".00, fue cancelado correctamente."

    const message = {
        from: EMAIL,
        to: clientInfo.email,
        subject: "Cancelacion de pedido",
        text: textMessage
    }
    await transport.sendMail(message);
}

module.exports = sendEmailDeleteOrderConfirmation;