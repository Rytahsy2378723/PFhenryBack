const { Router } = require("express");
const passport = require("passport");

const authRouter = Router();

const { googleAuth } = require("../handlers/authHandler");

authRouter.post("/", googleAuth);
authRouter.get("/github", passport.authenticate("auth-github", {scope: ["user:email"], session:false }));
authRouter.get("/github/callback", passport.authenticate("auth-github", {scope: ["user:email"], session:false }),
(req,res) => {
    res.status(200).json(req.user)
});

module.exports = authRouter;
