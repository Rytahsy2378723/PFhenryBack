require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/Restaurante`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Critic,
  Address,
  User,
  Table,
  Booking,
  Dishes,
  Seccion,
  Tags,
  Pedido,
  DetallePedido,
  Oferta,
  Token,
} = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);}
//Direccion.belongsToMany(Usuario, {through: "users_adress"});
//Reserva.belongsToMany(Usuario, {through: "user_booking"});
Dishes.belongsToMany(Tags, { through: "dishes_tags" });
Tags.belongsToMany(Dishes, { through: "dishes_tags" });
//Pedido.hasOne(Usuario);
//Pedido.hasMany(DetallePedido);
//DetallePedido.hasOne(Oferta);
//DetallePedido.hasOne(Plato);
//Usuario.hasOne(Token);
// Dishes.belongsTo(Section);
// Aca vendrian las relaciones
// Product.hasMany(Reviews);}
//Address.belongsToMany(User, {through: "users_adress"});
// Reserva.belongsToMany(User, { through: "user_booking" });
// Tags.belongsToMany(Dishes, { through: "dishes_tags" });
//Pedido.hasOne(User);
//Pedido.hasMany(DetallePedido);
//DetallePedido.hasOne(Oferta);
//DetallePedido.hasOne(Plato);
//User.hasOne(Token);
//Plato.hasOne(Seccion);
Booking.belongsTo(Table);
Table.hasMany(Booking);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
