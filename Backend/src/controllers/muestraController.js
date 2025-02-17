const muestraService = require("./../services/muestraService");

const getAllMuestras = async (req, res) => {
  try {
    const muestras = await muestraService.getAllMuestras();
    return   res.status(200).json(muestras);
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

const getMuestrasById = async (req, res) => {
  try {
    const muestras = await muestraService.getMuestrasById(req.params.id);
    if (muestras) {
      return  res.status(200).json(muestras);
    } else {
      return  res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

const deleteMuestras = async (req, res) => {
  try {
    const deleted = await muestraService.deleteMuestra(req.params.id);
    if (deleted) {
      return  res.status(204).json({ message: "Usuario eliminado" });
    } else {
      return  res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};


const createMuestras = async (req, res) => {
  try {
    const createdMuestra = await muestraService.createMuestra({
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        tincion: req.body.tincion,
        observaciones: req.body.observaciones,
        qr_muestra: req.body.qr_muestra,
        cassette_id: req.body.cassette_id,
    });
    if (createdMuestra){
      return res.status(201).json({ success : "Muestra creada",createdMuestra});
    }
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};

const editMuestras = async (req, res) => {
  try {
    const updatedMuestra = await muestraService.editMuestra(
      req.params.id,
      req.body
    );
    if (updatedMuestra) {
      return  res.status(200).json(updatedMuestra);
    } else {
      return  res.status(404).json({ message: "Muestra no encontrado" });
    }
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllMuestras,
    getMuestrasById,
    deleteMuestras,
    createMuestras,
    editMuestras
}