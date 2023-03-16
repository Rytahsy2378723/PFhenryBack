const {Router} = require("express");

const dishesRouter = Router();

const {
    getDetailHandler, 
    createDishHandler,
    getDishessHandler,
    editDishHandler
} = require("../handlers/dishesHandler");
/*
    RUTAS PARA PLATOS:
    RUTAS GET:
        getDishHandler{getAll, getById, getByName, getByTags}
    RUTAS POST:
        createDishHandler
    Ruta PUT:
        editDishHandler
    Ruta DELETE: 
        No lo ponemos porque usamos borrador logico.
*/
dishesRouter.get("/", getDishessHandler);
dishesRouter.get("/:id", getDetailHandler);
dishesRouter.put("/:id", editDishHandler);
dishesRouter.post("/", createDishHandler);

module.exports = dishesRouter;
