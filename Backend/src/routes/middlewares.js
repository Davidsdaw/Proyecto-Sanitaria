const jwt = require("jwt-simple");
const moment = require("moment");
const Usuario = require("./../database/models/Usuario");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (!decoded.expiredAt || decoded.expiredAt < moment().unix()) {
      return res.status(401).json({ error: "El token ha expirado" });
    }
    const user = await Usuario.findByPk(decoded.usuarioId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(500).json({ error: "Token inválido" });
  }
};

const checkRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.rol)) {
        return res.status(403).json({ error: 'Acceso denegado. Rol insuficiente' });
      }
      next();
    };
  };
  
module.exports= {
    verifyToken,
    checkRole,
}