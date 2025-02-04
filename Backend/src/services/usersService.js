const getAllUsers = async () => {
    try {
      return await Cliente.findAll();
    } catch (error) {
      throw new Error("Error al pedir todos los usuarios: " + error.message);
    }
  };
  
  const getUserById = async (id) => {
    try {
      return await Cliente.findByPk(id);
    } catch (error) {
      throw new Error("Error al pedir un usuario por id: " + error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error("El usuario no existe");
      }
      return await cliente.destroy();
    } catch (error) {
      throw new Error("Error al borrar el usuario: " + error.message);
    }
  };



  module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
  }