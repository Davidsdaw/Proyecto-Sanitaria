const imagenService = require("./../services/imagenService");

const getAllImages = async (req, res) => {
  try {
    const imagen = await imagenService.getAllImages();
    return  res.status(200).json(imagen);
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

const getImagenById = async (req, res) => {
  try {
    const imagen = await imagenService.getImagenById(req.params.id);
    if (imagen) {
      return  res.status(200).json(imagen);
    } else {
      return  res.status(404).json({ message: "Imagen no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteImagen = async (req, res) => {
  try {
    const deleted = await imagenService.deleteImagen(req.params.id);
    if (deleted) {
      return res.status(200).json({ message: "Imagen eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Imagen no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const createImagen = async (req, res) => {
  try {
    const createdImagen = await imagenService.createImagen({
        imagen: req.body.imagen,
        muestra_id: req.body.muestra_id,
    });
    return  res.status(201).json(createdImagen);
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllImages,
    getImagenById,
    deleteImagen,
    createImagen
}