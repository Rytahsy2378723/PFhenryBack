
const { Booking, Table } = require("../db.js");


const createBooking = async (body) => {
    const tableDesired = await Table.findByPk(body.mesa);
    const { fecha_inicio, hora_inicio, cantidad_comensales, nota } = body;
    let startTimeHour = hora_inicio[0] + hora_inicio[1];
    startTimeHour = parseInt(startTimeHour);
    startTimeHour = startTimeHour * 60;
    let startTimeMinute = hora_inicio[3] + hora_inicio[4];
    startTimeMinute = parseInt(startTimeMinute)

    const STARTMINUTES = startTimeHour + startTimeMinute;
    let FINISHMINUTES = STARTMINUTES + 120;
    let DATEEND = fecha_inicio;
    if (FINISHMINUTES > 1440) {
        let selectDay = DATEEND[8] + DATEEND[9]
        selectDay = parseInt(selectDay);
        selectDay = selectDay + 1;
        DATEEND = DATEEND[0] + DATEEND[1] + DATEEND[2] + DATEEND[3] + DATEEND[4] + DATEEND[5] + DATEEND[6] + DATEEND[7] + selectDay;
        FINISHMINUTES = FINISHMINUTES - 1440;
    }
    let TimeEnd = FINISHMINUTES / 60;
    TimeEnd = Math.floor(TimeEnd);
    let timeEndFormat = TimeEnd + ":" + hora_inicio[3] + hora_inicio[4] + ":00";

    await Booking.create({
        date_start: fecha_inicio,
        time_start: hora_inicio + ":00",
        date_end: DATEEND,
        time_end: timeEndFormat,
        costumers_quantity: cantidad_comensales,
        note: nota,
        tableId: tableDesired.id
    })
    return "Correctamente creado";

}

const getBookings = async () => {
    const allBookings = await Booking.findAll();
    return allBookings;
}

module.exports = { createBooking, getBookings }
