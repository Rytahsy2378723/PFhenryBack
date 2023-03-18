const {Router} = require("express");

const sectionRouter = Router();

const {
    sectionByIdHandler, 
    createSectionHandler, 
    getSectionHandler, 
    editSectionHandler
} = require("../handlers/sectionHandler");
/*
    RUTAS PARA TAGS:
    RUTAS GET:
        getDishHandler{getById}
    RUTAS POST:
        createDishHandler
    Ruta PUT:
        editDishHandler
    Ruta DELETE: 
        No lo ponemos porque usamos borrador logico.
*/
sectionRouter.get("/", getSectionHandler);
sectionRouter.get("/:id", sectionByIdHandler);
sectionRouter.put("/:id", editSectionHandler);
sectionRouter.post("/", createSectionHandler);

module.exports = sectionRouter;
