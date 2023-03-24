const { Router } = require("express");

const userRouter = Router();

const {
  userByIdHandler,
  createUserHandler,
  getUsersHandler,
  editUserHandler,
  deleteUserHandler,
  setAdminHandler,
  userLoginHandler,
} = require("../handlers/usersHandler");

userRouter.get("/", getUsersHandler);
userRouter.post("/login", userLoginHandler);
userRouter.get("/:id", userByIdHandler);
userRouter.put("/:id", editUserHandler);
userRouter.put("/admin/:id", setAdminHandler);
userRouter.post("/", createUserHandler);
userRouter.delete("/delete/:id", deleteUserHandler); // La ruta es exepcionalmente mas explicita para evitar accidentes

module.exports = userRouter;
