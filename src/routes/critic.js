const { Router } = require("express");

const criticRouter = Router();

const {
  getCriticsHandler,
  criticByIdHandler,
  editCriticHandler,
  createCriticHandler,
  deleteCriticHandler,
} = require("../handlers/criticsHandler");

criticRouter.get("/", getCriticsHandler);
criticRouter.get("/:id", criticByIdHandler);
criticRouter.put("/:id", editCriticHandler);
criticRouter.post("/", createCriticHandler);
criticRouter.delete("/delete/:id", deleteCriticHandler); // La ruta es exepcionalmente mas explicita para evitar accidentes

module.exports = criticRouter;
