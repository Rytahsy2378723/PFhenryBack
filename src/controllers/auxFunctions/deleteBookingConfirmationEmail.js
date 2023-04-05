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
    const textMessage = "<img src=`https://scontent.fntr6-4.fna.fbcdn.net/v/t39.30808-6/338441121_151457604519082_5765951118596468384_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGmvrDmONdKBRQDs_rDCAmBilL0gpm02xmKUvSCmbTbGSxD6XIyXtcvSVzgLlbbXZtrrly-4Pd2rud7AB0cy_OF&_nc_ohc=M6vS0SEjQ0EAX_XD7id&_nc_zt=23&_nc_ht=scontent.fntr6-4.fna&oh=00_AfAbud6ZQ2JGnJPK9PxuRoybRsQKWPNXYQ3npPLyrWL9zw&oe=6432FE2E`><p>Hola " + clientInfo.name + ", tu reservacion para el dia "
        + bookingInfo.date_start + " a las " + bookingInfo.time_start[0] + bookingInfo.time_start[1] + bookingInfo.time_start[2] + bookingInfo.time_start[3] + bookingInfo.time_start[4] + " fue cancelada correctamente."

    const message = {
        from: EMAIL,
        to: clientInfo.email,
        subject: "Cancelacion de reservacion",
        html: textMessage
    }
    await transport.sendMail(message);
}

module.exports = sendEmailCancelBooking; 