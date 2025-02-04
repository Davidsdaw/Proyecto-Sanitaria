const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Cassette extends Model {}

Cassette.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  organo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  caracteristicas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Cassette",  
  timestamps: false, 
});

module.exports = Cassette;
