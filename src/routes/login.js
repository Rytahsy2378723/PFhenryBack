const { Router } = require("express");
const loginRouter = Router();
const passport = require("passport");
const { googleAuth } = require("../handlers/loginHandler");
const { tokenSign } = require("../controllers/auxFunctions/generateToken");
const { loginHandler } = require("../handlers/loginHandler");
const { User } = require("../db");
const { createUser } = require("../controllers/userController");

//RUTA NORMAL
loginRouter.post("/", loginHandler);

//RUTA GITHUB
loginRouter.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  })
);
loginRouter.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  }),
  async (req, res) => {
    const user = req.user;
    const tokenSession = await tokenSign(user);

    res.status(200).send({ data: user, tokenSession });

    // const user = JSON.stringify(req.user);
    // res.status(200).send(user);
  }
);

//RUTA GOOGLE
loginRouter.post("/google", googleAuth);

module.exports = loginRouter;
