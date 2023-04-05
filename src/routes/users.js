const { Router } = require("express");
//1
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
userRouter.get("/:id", checkAuth, checkAdminAuth([true]), userByIdHandler);
userRouter.put("/:id", checkAuth, checkAdminAuth([true]), editUserHandler);

module.exports = userRouter;
