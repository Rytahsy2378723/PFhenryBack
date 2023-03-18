const { Router } = require("express");

const bookingsRouter = Router();

const { postBookingHandler, getBookingHandler } = require("../handlers/bookingHandler.js");

bookingsRouter.post("/", postBookingHandler);
bookingsRouter.get("/", getBookingHandler);

module.exports = bookingsRouter;