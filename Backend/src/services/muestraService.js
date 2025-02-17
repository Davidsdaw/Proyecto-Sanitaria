const Muestra = require("../database/models/Muestra");


const getAllMuestras = async () => {
    try {
        return await Muestra.findAll();
    } catch (error) {
        throw new Error("Error al pedir todos las muestras: " + error.message);
    }
};

const getMuestrasById = async (id) => {
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
        
        return await Muestra.create(MuestraData);
    } catch (error) {
        throw new Error("Error al crear la muestra: " + error.message);
    }
};

const editMuestra = async (id, muestraData) => {
    try {
      const user = await Usuario.findByPk(id);
      if (!user) {
        throw new Error("Cliente no encontrado");
      }
      return await Muestra.update(muestraData,{
        where: { id: id }
      });
    } catch (error) {
      throw new Error("Error al modificar la muestra: " + error.message);
    }
  };

module.exports = {
    getAllMuestras,
    getMuestrasById,
    deleteMuestra,
    createMuestra,
    editMuestra,
}