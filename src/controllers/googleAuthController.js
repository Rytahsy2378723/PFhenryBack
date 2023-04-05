const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const secretKey = process.env.JWT_SECRET;
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

async function verifyGoogleToken(token) {
  console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const payload = ticket.getPayload();
  const googleId = payload["sub"];
  return { payload, googleId };
}

async function findOrCreateUser(googleUser) {
  const { googleId, payload } = googleUser;
  let user = await User.findOne({ where: { googleId } });
  if (!user) {
    user = await User.create({
      googleId,
      email: payload["email"],
      name: payload["name"],
    });
  }
  console.log(user);
  return user;
}

function createJwtToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  console.log(token);
  return token;
}

module.exports = {
  verifyGoogleToken,
  findOrCreateUser,
  createJwtToken,
};
