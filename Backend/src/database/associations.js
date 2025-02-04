const Usuario = require("./models/Usuario");
const Cassette = require("./models/Cassette");
const Muestra = require("./models/Muestra");

// Relación 1 a N un usuario puede tener muchos cassettes
Usuario.hasMany(Cassette, { foreignKey: 'id_usuario' });
Cassette.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Relación 1 a N un cassette puede tener muchas muestras
Cassette.hasMany(Muestra, { foreignKey: 'id_cassette' });
Muestra.belongsTo(Cassette, { foreignKey: 'id_cassette' });

module.exports = { Usuario, Cassette, Muestra };
