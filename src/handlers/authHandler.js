const {
    verifyGoogleToken,
    findOrCreateUser,
    createJwtToken,
  } = require("../controllers/authController");
  

const googleAuth = async (req, res) => {
    try {
      const googleUser = await verifyGoogleToken(req.body.token);
      const user = await findOrCreateUser(googleUser);
      const jwtToken = createJwtToken(user);
      res.status(200).json({ token: jwtToken });
    } catch (error) {
      res.status(400).json({ error: "Authentication failed" });
    }
  };

  module.exports = {googleAuth}