const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Imagen extends Model {}

Imagen.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    muestra_id: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'muestras', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Imagen',
    tableName: 'imagenes',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Imagen;