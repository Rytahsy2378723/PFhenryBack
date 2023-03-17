const { Router } = require("express");

const addressRouter = Router();

const {
  getAddressHandler,
  addressByIdHandler,
  createAdressHandler,
  deleteAddressHandler,
} = require("../handlers/addressHandler");

addressRouter.get("/", getAddressHandler);
addressRouter.get("/:id", addressByIdHandler);
addressRouter.post("/", createAdressHandler);
addressRouter.delete("/:id", deleteAddressHandler);

module.exports = addressRouter;
