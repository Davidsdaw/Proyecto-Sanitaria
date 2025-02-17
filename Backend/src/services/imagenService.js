const Imagen = require("../database/models/Imagen");

const getAllImages = async () => {
    try {
        return await Imagen.findAll();
    } catch (error) {
        throw new Error("Error al pedir todas las imagenes " + error.message);
    }
};

const getImagenById = async (id) => {
    try {
        return await Imagen.findByPk(id);
    } catch (error) {
        throw new Error("Error al pedir una imagen por id: " + error.message);
    }
};

const deleteImagen = async (id) => {
    try {
        const cassette = await Imagen.findByPk(id);
        if (!cassette) {
            throw new Error("La imagen no existe");
        }
        await Imagen.destroy({ where: { id } })
        return {success:"La imagen ha sido borrado"};
    } catch (error) {
        throw new Error("Error al borrar la imagen: " + error.message);
    }
};

const createImagen = async (imagenData) => {
    try {
        await Imagen.create(imagenData);
        return { success : "La imagen ha sido creado"}
    } catch (error) {
        throw new Error("Error al crear la imagen: " + error.message);
    }
};

module.exports = {
    getAllImages,
    getImagenById,
    deleteImagen,
    createImagen
}