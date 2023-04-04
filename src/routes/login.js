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
    try {
      const githubUser = JSON.stringify(req.user);
      const email = req.user._json.email;
      const user = req.user;
      // if (email !== null) {
      //   user = User.findOne({ where: email });
      //   user
      //     ? (user = user)
      //     : (user = async () =>
      //         await createUser(req.user._json.name, null, email, null));
      // } else {
      //   user = req.user;
      // }

      const tokenSession = await tokenSign(user);

      const datos = { usuario: user, token: tokenSession };
      console.log(datos);
      const payload = JSON.stringify(datos);

      res.status(200).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
      </head>
      <body>
      <script>window.opener.postMessage(${payload}, 'http://localhost:3000')</script> 
      </body>
      </html>`);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

//RUTA GOOGLE
loginRouter.post("/google", googleAuth);

module.exports = loginRouter;
