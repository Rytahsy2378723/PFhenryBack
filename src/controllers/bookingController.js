
const { Booking, Table, User } = require("../db.js");
const moment = require("moment");
const { getTablesToCreateReservation } = require("./tableController.js");
const createBookingFunction = require("./auxFunctions/createBookingFunction.js");
const sendEmailCancelBooking = require("./auxFunctions/deleteBookingConfirmationEmail.js");


const createBooking = async (body) => {
    const createBooking = await createBookingFunction(body);
    return createBooking;
}

const getBookings = async () => {
    let allBookings = await Booking.findAll();
    allBookings = allBookings.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
    return allBookings;
}

//esta funcion retorna todas las reservas de un usuario cuyo id llega por parametros.
const getBookingsByUser = async (userId) => {
    const user = await User.findByPk(userId);
    let bookingsOfThisUser = await user.getBookings();
    bookingsOfThisUser = bookingsOfThisUser.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
    return bookingsOfThisUser;
}

const deleteBooking = async (bookingId) => {
    const booking = await Booking.findByPk(bookingId);
    const user = await User.findByPk(booking.UserId);
    await Booking.destroy({
        where: { id: bookingId }
    });
    await sendEmailCancelBooking(user, booking);
    return "Successfully deleted"
}

const getBookingsInThisDate = async (date) => {
    const bookings = await Booking.findAll({
        where: { date_start: date }
    });
    return bookings;
}

const updateBooking = async (idBooking, body) => {
    let { fecha_inicio, hora_inicio, cantidad_comensales, nota, mesa } = body;
    const bookingToUpdate = await Booking.findByPk(idBooking);
    fecha_inicio = fecha_inicio || bookingToUpdate.date_start;
    hora_inicio = hora_inicio || bookingToUpdate.time_start;
    cantidad_comensales = cantidad_comensales || bookingToUpdate.costumers_quantity;
    nota = nota || bookingToUpdate.note;
    mesa = mesa || bookingToUpdate.tableId;
    let bodyObject = { fecha_inicio, hora_inicio, cantidad_comensales };

    const responseTables = await getTablesToCreateReservation(bodyObject);
    const tableDesired = responseTables.find(table => table.id === mesa);
    if (tableDesired.availability) {
        const idUser = bookingToUpdate.UserId;
        bodyObject = { mesa, fecha_inicio, hora_inicio, cantidad_comensales, nota, idUser };
        await createBooking(bodyObject);
        await deleteBooking(bookingToUpdate.id);
        return "Successfully updated";
    } else {
        throw new Error("This table is not available for this date and time")
    }

}

module.exports = { getBookingsInThisDate, createBooking, getBookings, getBookingsByUser, deleteBooking, updateBooking }
