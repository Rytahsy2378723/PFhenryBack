const { Router } = require("express");

const authRouter = Router();

const {
    googleAuth
} = require("../handlers/authHandler");

authRouter.post("/", googleAuth);

module.exports = authRouter;
