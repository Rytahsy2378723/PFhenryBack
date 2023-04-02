const { Router } = require("express");

const bookingsRouter = Router();

const { getBookingsDatesAdminHandler, getBookingsDatesUserHandler, putBookingHandler, getBookingsInThisDateHandler, postBookingHandler, getBookingHandler, getBookingsByUserHandler, deleteBookingHandler } = require("../handlers/bookingHandler.js");

bookingsRouter.get("/admin/dates", getBookingsDatesAdminHandler);
bookingsRouter.get("/bookingsInThisDate", getBookingsInThisDateHandler);
bookingsRouter.post("/", postBookingHandler);
bookingsRouter.get("/admin/", getBookingHandler);
bookingsRouter.get("/:idUser", getBookingsByUserHandler);
bookingsRouter.delete("/:idBooking", deleteBookingHandler);
bookingsRouter.put("/:idBooking", putBookingHandler);
bookingsRouter.get("/dates/:idUser", getBookingsDatesUserHandler);



module.exports = bookingsRouter;