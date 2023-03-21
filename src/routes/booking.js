const { Router } = require("express");

const bookingsRouter = Router();

const { getBookingsInThisDateHandler, postBookingHandler, getBookingHandler, getBookingsByUserHandler, deleteBookingHandler } = require("../handlers/bookingHandler.js");

bookingsRouter.get("/date", getBookingsInThisDateHandler);
bookingsRouter.post("/", postBookingHandler);
bookingsRouter.get("/", getBookingHandler);
bookingsRouter.get("/:idUser", getBookingsByUserHandler);
bookingsRouter.delete("/:idBooking", deleteBookingHandler);


module.exports = bookingsRouter;