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
      //no puede ser superior a 255 caracterres
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      //hoy o de la semana siguiente
    },
    tincion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
      //no puede ser superior a 255 caracteres
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