const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Verificar el token de Google recibido desde el frontend utilizando la biblioteca "google-auth-library":
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}

// Buscar el usuario en la base de datos "users" usando el ID de Google. 
//Si el usuario no existe, crear uno nuevo con los datos proporcionados:
async function findOrCreateUser(googleUser) {
  const [user, created] = await User.findOrCreate({
    where: { googleId: googleUser.sub },
    defaults: {
      name: googleUser.name,
      email: googleUser.email,
      imageUrl: googleUser.picture,
    },
  });
  return user;
}



//Crear un token JWT que incluya la información del usuario y firmarlo con una clave secreta:
function createJwtToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}

module.exports = {
    verifyGoogleToken,
    findOrCreateUser,
    createJwtToken,
   
  };