const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    try {
      return await Usuario.findAll();
    } catch (error) {
      throw new Error("Error al pedir todos los usuarios: " + error.message);
    }
  };
  
  const getUserById = async (id) => {
    try {
      return await Usuario.findByPk(id);
    } catch (error) {
      throw new Error("Error al pedir un usuario por id: " + error.message);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      return await Usuario.findOne({ where: { email: email } });
    } catch (error) {
      throw new Error("Error al pedir un usuario por email : " + error.message);
    }
  };

  const getUserByDecodedEmail = async (email) => {
    try {
      if (!email) throw new Error("El email es undefined");
      return await Usuario.findOne({ where: { email: email } });
    } catch (error) {
      throw new Error("Error al pedir un usuario por email: " + error.message);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("El usuario no existe");
      }
      return await usuario.destroy();
    } catch (error) {
      throw new Error("Error al borrar el usuario: " + error.message);
    }
  };

  const createUser = async (userData) => {
    try {
      return await Usuario.create(userData);
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  };

  const editUser = async (id, userData) => {
    try {
      const user = await Usuario.findByPk(id);
      if (!user) {
        throw new Error("Cliente no encontrado");
      }
      if (userData.password) {
        userData.password=bcrypt.hashSync(userData.password, 10)
      }
      return await Usuario.update(userData,{
        where: { id: id }
      });
    } catch (error) {
      throw new Error("Error al modificar el usuario: " + error.message);
    }
  };

  const loginUser = async (email) => {
    try {
      const user = await Usuario.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error("Error al logear el usuario: " + error.message);
    }
  };
  
  const deleteAll = async () => {
    try {
      const deletedCount = await Usuario.destroy({
        where: {}, // Elimina todos los registros
      });
      return deletedCount;
    } catch (error) {
      throw new Error("Error al eliminar todos los usuarios: " + error.message);
    }
  };


  module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByDecodedEmail,
    deleteUser,
    createUser,
    editUser,
    loginUser,
    deleteAll,
  }