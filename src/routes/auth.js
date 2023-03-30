const { Router } = require("express");
const passport = require("passport");

const authRouter = Router();

const { googleAuth } = require("../handlers/authHandler");

authRouter.post("/", googleAuth);
authRouter.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user:email"],
    session: false,
  }),
  (req, res) => {
    const user = JSON.stringify(req.user);
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <body>
    </body>
    <script> window.opener.postMessage(${user}, "http://localhost:3000")
    </script>
    </html>`);
  }
);

module.exports = authRouter;
