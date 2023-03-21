const { Router } = require("express");
const bookings = Router();
const { createBooking, getBookings, getBookingsByUser, deleteBooking, getBookingsInThisDate } = require("../controllers/bookingController.js");

const postBookingHandler = async (req, res) => {
    try {
        const newBooking = await createBooking(req.body);
        res.status(201).json({ message: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBookingHandler = async (req, res) => {
    try {
        const allBookings = await getBookings();
        res.status(200).json(allBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//se recibe por params el id del usuario del que se desean obtener las reservaciones.
const getBookingsByUserHandler = async (req, res) => {
    try {
        const bookings = await getBookingsByUser(req.params.idUser);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBookingHandler = async (req, res) => {
    try {
        const deleteB = await deleteBooking(req.params.idBooking);
        res.status(200).json(deleteB);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBookingsInThisDateHandler = async (req, res) => {
    try {
        const bookings = await getBookingsInThisDate(req.body.date);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = { getBookingsInThisDateHandler, postBookingHandler, getBookingHandler, getBookingsByUserHandler, deleteBookingHandler }