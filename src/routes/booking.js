const { Router } = require("express");

const bookingsRouter = Router();

const { putBookingHandler, getBookingsInThisDateHandler, postBookingHandler, getBookingHandler, getBookingsByUserHandler, deleteBookingHandler } = require("../handlers/bookingHandler.js");

bookingsRouter.get("/date", getBookingsInThisDateHandler);
bookingsRouter.post("/", postBookingHandler);
bookingsRouter.get("/", getBookingHandler);
bookingsRouter.get("/:idUser", getBookingsByUserHandler);
bookingsRouter.delete("/:idBooking", deleteBookingHandler);
bookingsRouter.put("/:idBooking", putBookingHandler);


module.exports = bookingsRouter;