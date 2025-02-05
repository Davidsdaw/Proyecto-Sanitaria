const usersService = require("./../services/usersService");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jwt-simple");
const {sendRecoveryEmail} = require("../utils/mailer")

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
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      centro: req.body.centro,
      rol: req.body.rol,
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
    const { email, password } = req.body;

    const user = await usersService.loginUser(email);

    if (user) {
      const isCorrectPass = bcrypt.compareSync(password, user.password);
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


const generateRecoveryToken = (email) => {
  const payload = {
    email: email,
    createdAt: moment().unix(),
    expiredAt: moment().add(1, "hour").unix(),
  };
  const secret = process.env.JWT_SECRET;
  return jwt.encode(payload, secret);
};

const forgotPassword = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await usersService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    const token = generateRecoveryToken(email);

    await sendRecoveryEmail(email, token);

    res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    if (!newPassword) {
      return res.status(400).json({ error: "La nueva contraseña es requerida via Body" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (decoded.expiredAt < moment().unix()) {
      return res.status(400).json({ error: "El token ha expirado" });
    }

    const user = await usersService.getUserByDecodedEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
};


module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
    editUser,
    loginUser,
    forgotPassword,
    resetPassword
  };
  