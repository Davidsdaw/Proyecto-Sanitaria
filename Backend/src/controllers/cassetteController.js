const cassetteService = require("./../services/cassetteService");

const getAllCassettes = async (req, res) => {
  try {
    const cassettes = await cassetteService.getAllCassettes();
    res.status(200).json(cassettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCassettesById = async (req, res) => {
  try {
    const cassettes = await cassetteService.getCassettesById(req.params.id);
    if (cassettes) {
      res.status(200).json(cassettes);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCassettes = async (req, res) => {
  try {
    const deleted = await cassetteService.deleteCassettes(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Cassette eliminado" });
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createCassettes = async (req, res) => {
  try {
    const createdcassettes = await cassetteService.createCassettes({
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        organo: req.body.organo,
        idOrgano: req.body.idOrgano,
        caracteristicas: req.body.caracteristicas,
        observaciones: req.body.observaciones,
        qr_cassette: req.body.qr_cassette,
        usuario_id: req.body.usuario_id,
    });
    res.status(201).json(createdcassettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editCassettes = async (req, res) => {
  try {
    const updatedCassette = await cassetteService.editCassettes(
      req.params.id,
      req.body
    );
    if (updatedCassette) {
      res.status(200).json(updatedCassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllCassettes,
    getCassettesById,
    deleteCassettes,
    createCassettes,
    editCassettes
}