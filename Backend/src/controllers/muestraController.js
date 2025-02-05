const muestraService = require("./../services/muestraService");

const getAllMuestras = async (req, res) => {
  try {
    const muestras = await muestraService.getAllMuestras();
    res.status(200).json(muestras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMuestrasById = async (req, res) => {
  try {
    const muestras = await muestraService.getMuestrasById(req.params.id);
    if (muestras) {
      res.status(200).json(muestras);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMuestras = async (req, res) => {
  try {
    const deleted = await muestraService.deleteMuestras(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createMuestras = async (req, res) => {
  try {
    const createdMuestra = await muestraService.createMuestras({descripcion: req.body.descripcion,
        fecha: new Date(),
        email: req.body.email,
        tincion: req.body.tincion,
        observaciones: req.body.observaciones,
        qr_muestra: req.body.qr_muestra,
        cassette_id: req.body.cassette_id,
    });
    res.status(201).json(createdMuestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editMuestras = async (req, res) => {
  try {
    const updatedMuestra = await muestraService.editMuestras(
      req.params.id,
      req.body
    );
    if (updatedMuestra) {
      res.status(200).json(updatedMuestra);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllMuestras,
    getMuestrasById,
    deleteMuestras,
    createMuestras,
    editMuestras
}