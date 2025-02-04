const usersService = require("./../services/usersService");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await usersService.getUserById(req.params.id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await usersService.deleteUser(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const createdUser = await usersService.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
  };
  