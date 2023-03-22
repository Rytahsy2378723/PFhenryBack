const { Router } = require("express");

const authRouter = Router();

const {
    googleAuth
} = require("../handlers/authHandler");

authRouter.get("/", googleAuth);

module.exports = authRouter;