const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Muestra extends Model {}

Muestra.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  tincion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_cassette: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "Muestra", 
  timestamps: false,  
});

module.exports = Muestra;
