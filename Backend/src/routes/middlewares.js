const jwt = require("jwt-simple");
const moment = require("moment");
const Usuario = require("./../database/models/Usuario");

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.decode(token.split(' ')[1], process.env.JWT_SECRET);
    if (decoded.expiredAt < moment().unix()) {
      return res.status(401).json({ error: 'El token ha expirado' });
    }
    const user = await Usuario.findByPk(decoded.usuarioId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(500).json({ error: 'Token inválido' });
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