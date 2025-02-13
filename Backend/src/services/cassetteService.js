const Cassette = require("../database/models/Cassette");


const getAllCassettes = async () => {
    try {
        return await Cassette.findAll();
    } catch (error) {
        throw new Error("Error al pedir todos los cassettes: " + error.message);
    }
};

const getCassettesById = async (id) => {
    try {
        return await Cassette.findByPk(id);
    } catch (error) {
        throw new Error("Error al pedir un cassette por id: " + error.message);
    }
};

const deleteCassettes = async (id) => {
    try {
        const cassette = await Cassette.findByPk(id);
        if (!cassette) {
            throw new Error("El cassette no existe");
        }
        return await Cassette.destroy();
    } catch (error) {
        throw new Error("Error al borrar el cassette: " + error.message);
    }
};

const createCassettes = async (CassetteData) => {
    try {
        return await Cassette.create(CassetteData);
    } catch (error) {
        throw new Error("Error al crear el cassette: " + error.message);
    }
};

const editCassettes = async (id, cassetteData) => {
    try {
      const user = await Cassette.findByPk(id);
      if (!user) {
        throw new Error("Cassette no encontrado");
      }
      return await Cassette.update(cassetteData,{
        where: { id: id }
      });
    } catch (error) {
      throw new Error("Error al modificar el cassette: " + error.message);
    }
  };

module.exports = {
    getAllCassettes,
    getCassettesById,
    deleteCassettes,
    createCassettes,
    editCassettes,
}