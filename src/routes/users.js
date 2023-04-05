const { Router } = require("express");
//1
const userRouter = Router();
const {
  checkAuth,
  checkAdminAuth,
  blockParamsId,
} = require("../middleware/auth");

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
userRouter.delete("/delete/:id", checkAuth, blockParamsId, deleteUserHandler); // La ruta es exepcionalmente mas explicita para evitar accidentes
userRouter.get("/:id", checkAuth, blockParamsId, userByIdHandler);
userRouter.put("/:id", checkAuth, blockParamsId, editUserHandler);

module.exports = userRouter;
