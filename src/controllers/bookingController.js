
const { Booking, Table, User } = require("../db.js");
const moment = require("moment");


const createBooking = async (body) => {
    const tableDesired = await Table.findByPk(body.mesa);
    const { fecha_inicio, hora_inicio, cantidad_comensales, nota, idUser } = body;
    let startTimeHour = hora_inicio[0] + hora_inicio[1];
    startTimeHour = parseInt(startTimeHour);
    startTimeHour = startTimeHour * 60;
    let startTimeMinute = hora_inicio[3] + hora_inicio[4];
    startTimeMinute = parseInt(startTimeMinute)

    const STARTMINUTES = startTimeHour + startTimeMinute;
    let FINISHMINUTES = STARTMINUTES + 120;
    let DATEEND = fecha_inicio;
    if (FINISHMINUTES > 1440) {
        let startDate = moment(fecha_inicio);
        DATEEND = startDate.add(1, "day");
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
        tableId: tableDesired.id,
        UserId: idUser
    })
    return "Successfully created";

}

const getBookings = async () => {
    const allBookings = await Booking.findAll();
    return allBookings;
}

//esta funcion retorna todas las reservas de un usuario cuyo id llega por parametros.
const getBookingsByUser = async (userId) => {
    const user = await User.findByPk(userId);
    const bookingsOfThisUser = await user.getBookings();
    return bookingsOfThisUser;
}

const deleteBooking = async (bookingId) => {
    await Booking.destroy({
        where: { id: bookingId }
    });
    return "Successfully deleted"
}

const getBookingsInThisDate = async (date) => {
    const bookings = await Booking.findAll({
        where: { date_start: date }
    });
    return bookings;
}

module.exports = { getBookingsInThisDate, createBooking, getBookings, getBookingsByUser, deleteBooking }
