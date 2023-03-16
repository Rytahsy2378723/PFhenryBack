const {Router} = require("express");
const dishesRouter = require("./dishes");
const tagsRouter = require("./tag");
//Aca tienen que poner los require de las cargas que hacen

const mainRouter = Router();

mainRouter.use("/dishes", dishesRouter);
mainRouter.use("/tags", tagsRouter);

module.exports = mainRouter;