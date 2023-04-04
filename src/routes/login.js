const { Router } = require("express");
const loginRouter = Router();
const passport = require("passport");
const { googleAuth } = require("../handlers/loginHandler");
const { tokenSign } = require("../controllers/auxFunctions/generateToken");
const { loginHandler } = require("../handlers/loginHandler");

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
    const user = JSON.stringify(req.user);
    const tokenSession = await tokenSign(user);

    const datos = { user , tokenSession}

    // res.status(200).send({ data: user, tokenSession });
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
    <script>window.opener.postMessage(${datos}, 'http:/localhost:3000')</script>
    </body>
    </html>`);

    // const user = JSON.stringify(req.user);
    // res.status(200).send(user);
  }
)

//RUTA GOOGLE
loginRouter.post("/google", googleAuth);

module.exports = loginRouter;
