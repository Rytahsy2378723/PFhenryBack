const passport = require("passport");
const { Strategy } = require("passport-github2");

passport.use(
  "auth-github",
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://pfhenryback-production.up.railway.app/login/github/callback", //esta ruta se extrae de la configuracion de la pagina de github
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      done(null, profile);
    }
  )
);
