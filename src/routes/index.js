const { Router } = require("express");
const dishesRouter = require("./dishes");
const tagsRouter = require("./tag");
const sectionRouter = require("./section");
const userRouter = require("./users");
const bookingsRouter = require("./booking");
const tablesRouter = require("./table.js");
const addressRouter = require("./address");
const criticRouter = require("./critic");
//Aca tienen que poner los require de las cargas que hacen

const mainRouter = Router();

mainRouter.use("/dishes", dishesRouter);
mainRouter.use("/tags", tagsRouter);
mainRouter.use("/sections", sectionRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/address", addressRouter);
mainRouter.use("/critics", criticRouter);
mainRouter.use("/bookings", bookingsRouter);
mainRouter.use("/tables", tablesRouter);

module.exports = mainRouter;
