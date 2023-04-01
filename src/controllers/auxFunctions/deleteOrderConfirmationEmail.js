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
    const textMessage = "<img src=`https://scontent.fntr6-1.fna.fbcdn.net/v/t39.30808-6/338441121_151457604519082_5765951118596468384_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGmvrDmONdKBRQDs_rDCAmBilL0gpm02xmKUvSCmbTbGSxD6XIyXtcvSVzgLlbbXZtrrly-4Pd2rud7AB0cy_OF&_nc_ohc=jP_HnZCrBSAAX8Zcjke&_nc_zt=23&_nc_ht=scontent.fntr6-1.fna&oh=00_AfDuYloHPjcsPxRmbA55CGDe189hbuR1juuwlvQyunhbog&oe=642D0F6E`><p>Hola " + clientInfo.name + ", tu pedido que seria " +
        "entregado el " + orderInfo.date_delivery + " a las " + orderInfo.time_delivery + " y tendria un costo de $" +
        orderInfo.total_price + " fue cancelado correctamente.</p>"

    const message = {
        from: EMAIL,
        to: clientInfo.email,
        subject: "Cancelacion de pedido",
        html: textMessage
    }
    await transport.sendMail(message);
}

module.exports = sendEmailDeleteOrderConfirmation;