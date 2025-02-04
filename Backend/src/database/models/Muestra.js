const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Muestra extends Model { }

Muestra.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000],
            msg: "La descripción no puede exceder los 1000 caracteres",
        }
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

    tincion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: [0, 100],
            msg: "La tinción no puede exceder los 100 caracteres",
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

    id_cassette: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "El id_cassette debe ser un número entero válido",
            },
        }
    }

}, {
    sequelize,
    modelName: "Muestra",
    timestamps: false,
});

module.exports = Muestra;
