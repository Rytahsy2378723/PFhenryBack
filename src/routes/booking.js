const { Router } = require("express");

const bookingsRouter = Router();

const { getBookingsDatesAdminHandler, getBookingsDatesUserHandler, putBookingHandler, getBookingsInThisDateHandler, postBookingHandler, getBookingHandler, getBookingsByUserHandler, deleteBookingHandler } = require("../handlers/bookingHandler.js");

bookingsRouter.get("/datesAdmin", getBookingsDatesAdminHandler);
bookingsRouter.get("/bookingsInThisDate", getBookingsInThisDateHandler);
bookingsRouter.post("/", postBookingHandler);
bookingsRouter.get("/", getBookingHandler);
bookingsRouter.get("/:idUser", getBookingsByUserHandler);
bookingsRouter.delete("/:idBooking", deleteBookingHandler);
bookingsRouter.put("/:idBooking", putBookingHandler);
bookingsRouter.get("/dates/:idUser", getBookingsDatesUserHandler);



module.exports = bookingsRouter;