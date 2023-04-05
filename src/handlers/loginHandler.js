const { userLogin } = require("../controllers/loginController");
//1
const {
  verifyGoogleToken,
  findOrCreateUser,
  createJwtToken,
} = require("../controllers/googleAuthController");

//
const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const response = await userLogin(email, password);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const googleAuth = async (req, res) => {
  const { credential, g_csrf_token } = req.body;
  try {
    const googleUser = await verifyGoogleToken(g_csrf_token);
    const user = await findOrCreateUser(googleUser);
    const jwtToken = createJwtToken(user);
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: "Authentication failed" });
  }
};

module.exports = {
  loginHandler,
  googleAuth,
};
