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
    
    if (!imagen || !imagen.imagen) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    // Configurar el tipo de contenido de la imagen
    res.setHeader("Content-Type", "image/jpeg"); // O el formato correcto (image/png, etc.)
    res.send(imagen.imagen); // Enviar la imagen en la respuesta

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
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const createdImagen = await imagenService.createImagen({
      imagen: req.file.buffer, // Guardar el buffer como BLOB
      muestra_id: req.body.muestra_id,
    });

    return res.status(201).json({ success: "Imagen creada", data: createdImagen });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllImagenById = async (req, res) => {
  try {
      const imagenes = await imagenService.getAllImagenById(req.params.id);

      if (!imagenes || imagenes.length === 0) {
          return res.status(404).json({ error: "Imagen no encontrada" });
      }

      // Si hay varias imágenes, devuelve un array de imágenes como blobs
      res.setHeader("Content-Type", "application/json");
      res.json(imagenes.map(imagen => ({
          id: imagen.id,
          imagen: `data:image/jpeg;base64,${imagen.imagen.toString("base64")}`,  // Convertir BLOB a Base64
          muestra_id: imagen.muestra_id
      })));

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getAllImages,
    getImagenById,
    deleteImagen,
    createImagen,
    getAllImagenById,
}