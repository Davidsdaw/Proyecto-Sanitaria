const cassetterouter = require("express").Router();
const cassetteController = require("./../controllers/cassetteController");
const {verifyToken,checkRole} = require("./middlewares");

cassetterouter.get("/",verifyToken, cassetteController.getAllCassettes);
cassetterouter.get("/:id",verifyToken, cassetteController.getCassettesById);
cassetterouter.delete("/delete/:id",verifyToken, cassetteController.deleteCassettes);
cassetterouter.post("/create",verifyToken, cassetteController.createCassettes);
cassetterouter.patch("/edit/:id",verifyToken, cassetteController.editCassettes);
cassetterouter.get("/idorgano/:idOrgano",verifyToken, cassetteController.getIdOrgano);

module.exports = cassetterouter;