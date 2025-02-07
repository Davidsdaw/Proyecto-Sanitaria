const { Sequelize } = require('sequelize');
const sequelize = require('./db');

// inserción de todos los modelos
const Usuario = require('./models/Usuario');
const Cassette = require('./models/Cassette');
const Muestra = require('./models/Muestra');
const Imagen = require('./models/Imagen');

// relaciones entre tablas
Usuario.hasMany(Cassette, { foreignKey: 'usuario_id' });
Cassette.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Cassette.hasMany(Muestra, { foreignKey: 'cassette_id' });
Muestra.belongsTo(Cassette, { foreignKey: 'cassette_id' });

Muestra.hasMany(Imagen, { foreignKey: 'muestra_id' }); 
Imagen.belongsTo(Muestra, { foreignKey: 'muestra_id' });

module.exports = {
  sequelize,
  Usuario,
  Cassette,
  Muestra,
  Imagen,
};