const { Router } = require("express");
const bookings = Router();
const { createBooking, getBookings, getAllBookingInThisTable } = require("../controllers/bookingController.js");

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




module.exports = { postBookingHandler, getBookingHandler }