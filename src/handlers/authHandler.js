const {
    verifyGoogleToken,
    findOrCreateUser,
    createJwtToken,
  } = require("../controllers/authController");
  

const googleAuth = async (req, res) => {
    const {credential, g_csrf_token} = req.body
    try {
      console.log(req.body)
      const googleUser = await verifyGoogleToken(g_csrf_token);
      const user = await findOrCreateUser(googleUser);
      const jwtToken = createJwtToken(user);
      res.status(200).json({ token: jwtToken });
    } catch (error) {
      res.status(400).json({ error: "Authentication failed" });
    }
  };

  module.exports = {googleAuth}