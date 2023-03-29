const nodemailer = require("nodemailer");
const { EMAIL, PASS_EMAIL } = process.env;

const sendEmailCancelBooking = async (clientInfo, bookingInfo) => {
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
    const textMessage = "Hola " + clientInfo.name + ", tu reservacion para el dia "
        + bookingInfo.date_start + " a las " + bookingInfo.time_start + " fue cancelada correctamente"

    const message = {
        from: EMAIL,
        to: clientInfo.email,
        subject: "Confirmacion de cancelacion de reserva",
        text: textMessage
    }
    await transport.sendMail(message);
}

module.exports = sendEmailCancelBooking; 