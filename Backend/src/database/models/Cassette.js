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
    validate: {
      isDate: {
        msg: "La fecha debe ser una fecha válida en formato YYYY-MM-DD",
      },
    }
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000],
      msg: "La descripción no puede exceder los 1000 caracteres",
    }
  },

  organo: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100],
      msg: "El órgano no puede exceder los 100 caracteres",
    }
  },

  caracteristicas: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000],
      msg: "Las características no pueden exceder los 1000 caracteres",
    }
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: {
        msg: "El id_usuario debe ser un número entero válido",
      },
    }
  },

  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000],
      msg: "Las observaciones no pueden exceder los 1000 caracteres",
    }
  },

}, {
  sequelize,
  modelName: "Cassette",  
  timestamps: false, 
});

module.exports = Cassette;

