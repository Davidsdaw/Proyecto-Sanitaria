const cassetterouter = require("express").Router();
const cassetteController = require("./../controllers/cassetteController");
const {verifyToken,checkRole} = require("./middlewares");

cassetterouter.get("/", cassetteController.getAllCassettes);
cassetterouter.get("/:id", cassetteController.getCassettesById);
cassetterouter.delete("/delete/:id", cassetteController.deleteCassettes);
cassetterouter.post("/create", cassetteController.createCassettes);
cassetterouter.patch("/edit/:id", cassetteController.editCassettes);

module.exports = cassetterouter;