const usersService = require("./../services/usersService");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jwt-simple");

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
    const createdUser = await usersService.createUser({nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      pass: bcrypt.hashSync(req.body.pass, 10),
      rol: req.body.rol,
      centro: req.body.centro,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const updatedUser = await usersService.editUser(
      req.params.id,
      req.body
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createToken=(user) => { 
  const payload={
    usuarioId:user.id,
    createdAt:moment().unix(),
    expiredAt:moment().add(60,"minutes").unix()
  }
  return jwt.encode(payload, process.env.JWT_SECRET)
 }

 const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await usersService.loginUser(email);

    if (user) {
      const isCorrectPass = bcrypt.compareSync(pass, user.pass);
      if (isCorrectPass) {
        res.json({ success: createToken(user) });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
    editUser,
    loginUser,
  };
  