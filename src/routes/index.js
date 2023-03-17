const { Router } = require("express");
const dishesRouter = require("./dishes");
const tagsRouter = require("./tag");
const userRouter = require("./users");
const orderRouter = require("./orders")
//Aca tienen que poner los require de las cargas que hacen

const mainRouter = Router();

mainRouter.use("/dishes", dishesRouter);
mainRouter.use("/tags", tagsRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/orders", orderRouter)

module.exports = mainRouter;
