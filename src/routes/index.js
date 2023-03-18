const { Router } = require("express");
const dishesRouter = require("./dishes");
const tagsRouter = require("./tag");
const sectionRouter = require("./section");
const userRouter = require("./users");
const addressRouter = require("./address");
//Aca tienen que poner los require de las cargas que hacen

const mainRouter = Router();

mainRouter.use("/dishes", dishesRouter);
mainRouter.use("/tags", tagsRouter);
mainRouter.use("/sections", sectionRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/address", addressRouter);

module.exports = mainRouter;
