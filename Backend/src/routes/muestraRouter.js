const muestrarouter = require("express").Router();
const muestraController = require("./../controllers/muestraController");
const {verifyToken,checkRole} = require("./middlewares");



muestrarouter.get("/", muestraController.getAllMuestras);
muestrarouter.get("/:id", muestraController.getMuestrasById);
muestrarouter.delete("/delete/:id", muestraController.deleteMuestras);
muestrarouter.post("/create", muestraController.createMuestras);
muestrarouter.patch("/edit/:id", muestraController.editMuestras);

module.exports = muestrarouter;