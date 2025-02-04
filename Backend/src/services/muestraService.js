const Muestra = require("../database/models/Muestra");


const getAllMuestras = async () => {
    try {
        return await Muestra.findAll();
    } catch (error) {
        throw new Error("Error al pedir todos las muestras: " + error.message);
    }
};

const getMuestraById = async (id) => {
    try {
        return await Muestra.findByPk(id);
    } catch (error) {
        throw new Error("Error al pedir una muestra por id: " + error.message);
    }
};

const deleteMuestra = async (id) => {
    try {
        const muestra = await Muestra.findByPk(id);
        if (!muestra) {
            throw new Error("La muestra no existe");
        }
        return await Muestra.destroy();
    } catch (error) {
        throw new Error("Error al borrar la muestra: " + error.message);
    }
};

const createMuestra = async (MuestraData) => {
    try {
        return await Muestra.create(CassetteData);
    } catch (error) {
        throw new Error("Error al crear la muestra: " + error.message);
    }
};


module.exports = {
    getAllMuestras,
    getMuestraById,
    deleteMuestra,
    createMuestra,
}