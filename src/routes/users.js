const { Router } = require("express");

const userRouter = Router();
const { checkAuth, checkAdminAuth } = require("../middleware/auth");

const {
  userByIdHandler,
  createUserHandler,
  getUsersHandler,
  editUserHandler,
  deleteUserHandler,
  setAdminHandler,
} = require("../handlers/usersHandler");

userRouter.get("/", checkAuth, checkAdminAuth([true]), getUsersHandler);
userRouter.post("/", createUserHandler);
userRouter.put(
  "/admin/:id",
  checkAuth,
  checkAdminAuth([true]),
  setAdminHandler
);
userRouter.delete(
  "/delete/:id",
  checkAuth,
  checkAdminAuth([true]),
  deleteUserHandler
); // La ruta es exepcionalmente mas explicita para evitar accidentes
userRouter.get("/:id", checkAuth, userByIdHandler);
userRouter.put("/:id", checkAuth, editUserHandler);

module.exports = userRouter;
