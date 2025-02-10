const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
          msg: 'El nombre solo puede contener letras y espacios',
        },
        len: {
          args: [3, 50],
          msg: 'El nombre debe tener entre 3 y 50 caracteres',
        },
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
          msg: 'El apellido solo puede contener letras y espacios',
        },
        len: {
          args: [3, 50],
          msg: 'El apellido debe tener entre 3 y 50 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email no es válido',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/],
          msg: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial (Ejemplo: Abcdef1!)."
        },
        len: {
          args: [8, 100],
          msg: "La contraseña debe tener entre 8 y 100 caracteres."
        },
      },
    },
    centro: {
      type: DataTypes.ENUM('IES Ribera del Tajo', 'IES Gabriel Alonso de Herrera'),
      allowNull: true,
      validate:{
        isIn: {
          args: [["IES Ribera del Tajo","IES Gabriel Alonso de Herrera"]],
          msg: 'El centro solo puede ser uno de los indicados',
        },
      }
    },
    rol: {
      type: DataTypes.ENUM('administrador', 'alumno'),
      allowNull: false,
      defaultValue: 'alumno',
      validate: {
        isIn: {
          args: [['administrador', 'alumno']],
          msg: "El rol debe ser 'administrador' o 'alumno'.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Usuario;