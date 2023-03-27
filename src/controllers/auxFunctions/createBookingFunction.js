const { Booking, Table, User } = require("../../db.js");
const moment = require("moment");
const sendEmail = require("./bookingConfirmationEmail.js");

//el front envia la fecha y hora en formatos exactos y como string (incluyendo guiones y : exactos)
//Fecha: "YYYY-MM-DD"
//Hora: "HH:MM"

const createBookingFunction = async (body) => {
    //calculamos la hora de inicio de la reserva en minutos para poder identificar la hora y fecha 
    //del fin de la reserva.
    const tableDesired = await Table.findByPk(body.mesa);
    const { fecha_inicio, hora_inicio, cantidad_comensales, nota, idUser } = body;
    let startTimeHour = hora_inicio[0] + hora_inicio[1];
    startTimeHour = parseInt(startTimeHour);
    startTimeHour = startTimeHour * 60;
    let startTimeMinute = hora_inicio[3] + hora_inicio[4];
    startTimeMinute = parseInt(startTimeMinute)

    const STARTMINUTES = startTimeHour + startTimeMinute;
    //calculamos que la hora del final de la reserva sera 120 minutos despues del comienzo de la misma
    //y seteamos la fecha de finalizacion con la misma de inicio en caso de que los minutos no superen los 1440
    //en caso de que supere significa que la reservacion terminara el dia siguiente.
    let FINISHMINUTES = STARTMINUTES + 120;
    let DATEEND = fecha_inicio;
    if (FINISHMINUTES > 1440) {
        //calculamos la fecha de finalizacion de la reserva con la libreria moment a la cual se le pide añadir
        //1 dia a la fecha de inicio de la reserva y se calcula el minuto de finalizacion restandole los 1440 
        //minutos del dia anterior para obtener solo los minutos que corresponden al nuevo dia.
        let startDate = moment(fecha_inicio);
        DATEEND = startDate.add(1, "day");
        FINISHMINUTES = FINISHMINUTES - 1440;
    }
    //obtenemos la hora de finalizacion al dividir los minutos entre 60 minutos que tiene cada hora
    //y le aplicamos un Math.floor para obtener solo el numero entero (la hora exacta sin minutos)
    //despues se guarda en timeEndFormat la hora exacta de finalizacion con los minutos en el formato HH:MM:SS.
    let TimeEnd = FINISHMINUTES / 60;
    TimeEnd = Math.floor(TimeEnd);
    let timeEndFormat = TimeEnd + ":" + hora_inicio[3] + hora_inicio[4] + ":00";

    const newBooking = await Booking.create({
        date_start: fecha_inicio,
        time_start: hora_inicio + ":00",
        date_end: DATEEND,
        time_end: timeEndFormat,
        costumers_quantity: cantidad_comensales,
        note: nota,
        tableId: tableDesired.id,
        UserId: idUser
    })
    const userInfo = await User.findByPk(idUser);
    await sendEmail(userInfo, newBooking);
    return newBooking;
}

module.exports = createBookingFunction;