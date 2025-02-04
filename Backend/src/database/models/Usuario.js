const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model { }

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            args: [/^[a-zA-Z0-9\s]+$/],
            msg: "El nombre solo puede contener letras, números y espacios",

            len: [1, 100],
            msg: "El nombre debe tener entre 1 y 100 caracteres",
        }
    },

    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            args: [/^[a-zA-Z0-9\s]*$/],
            msg: "Los apellidos solo pueden contener letras, números y espacios",
            
        }
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Debe proporcionar una dirección de correo electrónico válida",
            },
            len: [1, 255],
            msg: "El correo electrónico debe tener entre 1 y 255 caracteres",
        }
    },

    pass: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [6, 255],
            msg: "La contraseña debe tener entre 6 y 255 caracteres",
        }
    },

    rol: {
        type: DataTypes.ENUM('admin', 'tecnico'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['admin', 'tecnico']],
                msg: "El rol debe ser 'admin' o 'tecnico'",
            }
        }
    },

    centro: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [1, 255],
            msg: "El centro debe tener entre 1 y 255 caracteres",
        }
    }

}, {
    sequelize,
    modelName: "Usuario",
    timestamps: false,
});

module.exports = Usuario;
