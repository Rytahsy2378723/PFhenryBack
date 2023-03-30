const nodemailer = require("nodemailer");
const { EMAIL, PASS_EMAIL } = process.env;


const sendEmailOrderConfirmation = async (orderInfo, clientInfo) => {
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
    const textMessage = "Hola " + clientInfo.name + ", tu pedido fue creado correctamente y estara siendo " +
        "entregado el " + orderInfo.date_delivery + " a las " + orderInfo.time_delivery + " y tendra un costo de $" +
        orderInfo.total_price + ".00, muchas gracias por tu preferencia."

    const message = {
        from: EMAIL,
        to: clientInfo.email,
        subject: "Confirmacion de pedido",
        text: textMessage
    }
    await transport.sendMail(message);
}

module.exports = sendEmailOrderConfirmation;