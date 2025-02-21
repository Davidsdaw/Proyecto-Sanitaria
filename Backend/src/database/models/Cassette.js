const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const organos = require('../../utils/organos');

class Cassette extends Model {}

Cassette.init(
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
        notEmpty: {
          msg: "El campo 'descripcion' no puede estar vacío."
        },
        is: {
          args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
          msg: 'La descripcion solo puede contener letras y espacios',
        }
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'fecha' no puede estar vacío."
        },
        isDate: {
          msg: "El campo 'fecha' debe ser una fecha válida."
        }
      }
    },
    organo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'organo' no puede estar vacío."
        },
        isAlpha: {
          msg: "El campo 'organo' solo puede contener letras."
        },
        len: {
          args: [3, 50],
          msg: "El campo 'organo' debe tener entre 3 y 50 caracteres."
        },
        isIn: {
          args: [organos],
          msg: "El 'organo' debe ser uno de los valores permitidos."
        },
        is: {
          args: [/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/],
          msg: 'El organo solo puede contener letras y espacios',
        }
      }
    },
    idOrgano: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'idOrgano' no puede estar vacío."
        }
      }
    },
    caracteristicas: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'caracteristicas' no puede estar vacío."
        }
      }
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'observaciones' no puede estar vacío."
        }
      }
    },
    qr_cassette: {
      type: DataTypes.TEXT,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onDelete: 'CASCADE',
      validate: {
        notEmpty: {
          msg: "El campo 'usuario_id' no puede estar vacío."
        },
        isUUID: {
          args: 4,
          msg: "El campo 'usuario_id' debe ser un UUID válido."
        }
      }
    },
  },
  {
    sequelize,
    modelName: 'Cassette',
    tableName: 'cassettes',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Cassette;
