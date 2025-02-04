const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model { }

Model.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },

    pass: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    rol: {
        type: DataTypes.ENUM('admin', 'tecnico'),
        allowNull: false,
    },

    centro: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }

}, {
    sequelize,
    modelName: "Usuario",
    timestamps: false,
});

module.exports = Usuario;
