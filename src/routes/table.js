const { Router } = require("express");

const tablesRouter = Router();

const { putTableHandler, postTableHandler, getAllTablesHandler, getAllBookingInThisTableHandler, getTablesToCreateReservationHandler, deleteTableHandler } = require("../handlers/tableHandler.js");

tablesRouter.post("/", postTableHandler);
tablesRouter.get("/allTables", getAllTablesHandler);
tablesRouter.get("/:id", getAllBookingInThisTableHandler);
tablesRouter.get("/", getTablesToCreateReservationHandler);
tablesRouter.delete("/:idTable", deleteTableHandler);
tablesRouter.put("/", putTableHandler);

module.exports = tablesRouter;