const { Router } = require("express");

const tablesRouter = Router();

const { putTableHandler, postTableHandler, getAllTablesHandler, getAllBookingInThisTableHandler, getTablesToCreateReservationHandler, deleteTableHandler } = require("../handlers/tableHandler.js");

tablesRouter.post("/create", postTableHandler);
tablesRouter.get("/allTables", getAllTablesHandler);
tablesRouter.get("/:id", getAllBookingInThisTableHandler);
tablesRouter.post("/", getTablesToCreateReservationHandler);
tablesRouter.delete("/:idTable", deleteTableHandler);
tablesRouter.put("/", putTableHandler);

module.exports = tablesRouter;