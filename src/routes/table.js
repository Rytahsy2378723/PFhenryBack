const { Router } = require("express");

const tablesRouter = Router();

const { postTableHandler, getAllTablesHandler, getAllBookingInThisTableHandler, getTablesToCreateReservationHandler } = require("../handlers/tableHandler.js");

tablesRouter.post("/", postTableHandler);
tablesRouter.get("/allTables", getAllTablesHandler);
tablesRouter.get("/:id", getAllBookingInThisTableHandler);
tablesRouter.get("/", getTablesToCreateReservationHandler);

module.exports = tablesRouter;