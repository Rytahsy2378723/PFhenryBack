const { Router } = require("express");

const userRouter = Router();

const {
  userByIdHandler,
  createUserHandler,
  getUsersHandler,
  editUserHandler,
  deleteUserHandler,
  setAdminHandler,
} = require("../handlers/usersHandler");

userRouter.get("/", getUsersHandler);
userRouter.post("/", createUserHandler);
userRouter.put("/admin/:id", setAdminHandler);
userRouter.delete("/delete/:id", deleteUserHandler); // La ruta es exepcionalmente mas explicita para evitar accidentes
userRouter.get("/:id", userByIdHandler);
userRouter.put("/:id", editUserHandler);

module.exports = userRouter;
