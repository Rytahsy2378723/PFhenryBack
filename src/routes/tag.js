const {Router} = require("express");

const tagsRouter = Router();

const {
    tagByIdHandler, 
    createTagHandler, 
    getTagsHandler, 
    editTagHandler
} = require("../handlers/tagHandler");
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
tagsRouter.get("/", getTagsHandler);
tagsRouter.get("/:id", tagByIdHandler);
tagsRouter.put("/:id", editTagHandler);
tagsRouter.post("/", createTagHandler);

module.exports = tagsRouter;
