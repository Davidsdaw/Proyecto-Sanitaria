const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Muestra extends Model {}

Muestra.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: "El campo 'descripcion' no puede superar los 255 caracteres."
        }
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "El campo 'fecha' debe ser una fecha válida."
        }
      }
    },
    tincion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: "El campo 'observaciones' no puede superar los 255 caracteres."
        }
      }
    },
    qr_muestra: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cassette_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cassettes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Muestra',
    tableName: 'muestras',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Muestra;
