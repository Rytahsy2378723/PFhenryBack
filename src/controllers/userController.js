const { User, Address, Critic, Order, Booking } = require("../db");
const bcrypt = require("bcrypt"); //Hash de contrasenas (pack de npm)

//Funcion que se encarga de guardar el nuevo registro que lleva por POST en la DB
const createUser = async (name, password, email, phoneNumber) => {
  const oldUser = await User.findOne({ where: { email } });
  if (oldUser) {
    return oldUser;
  }
  const newUser = await User.create({
    name,
    password,
    email,
    phoneNumber,
    admin: true,
  });
  return newUser;
};

//Retorna el user buscado por Id
const getUserById = async (id) => {
  const result = await User.findByPk(id, {
    include: [
      { model: Address, as: "Addresses" },
      { model: Critic, as: "Critics" },
      { model: Order, as: "Orders" },
      { model: Booking, as: "bookings" },
    ],
    attributes: { exclude: ["password"] },
  });
  return result
    ? result
    : (() => {
        throw new Error("User not Found");
      })();
};

//Retorna todos los users
const getAllUsers = async () => {
  const users = await User.findAll();
  return [...users];
};

//Edita un registro de user y lo devuelve editado
const editUser = async (id, updatedUser) => {
  const { password } = updatedUser; //contrasena actual
  console.log(password);
  const user = await User.findOne({ where: { id } });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // La contraseña es correcta, el usuario puede cambiar datos
      const newUser = await User.update(
        {
          name: updatedUser.name,
          password: updatedUser.newPassword,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
        },
        {
          where: { id: id },
        }
      );
      return newUser;
    } else {
      // La contraseña es incorrecta, mostrar un mensaje de error
      throw new Error("La contrasena es Incorrecta");
    }
  } else {
    // El usuario no existe, mostrar un mensaje de error
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

//Elimina un User por Id
const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
};

//Interruptor de estado Admin para usuario
const setAdmin = async (id) => {
  const state = await User.findAll(
    {
      attributes: ["admin"],
    },
    { where: { id: id } }
  );
  const newUser = await User.update(
    {
      admin: !state,
    },
    {
      where: { id: id },
    }
  );
  return newUser;
};
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser,
  setAdmin,
};
