const muestrarouter = require("express").Router();
const muestraController = require("./../controllers/muestraController");
const {verifyToken,checkRole} = require("./middlewares");

muestrarouter.get("/",verifyToken, muestraController.getAllMuestras);
muestrarouter.get("/:id",verifyToken, muestraController.getMuestrasById);
muestrarouter.delete("/delete/:id",verifyToken, muestraController.deleteMuestras);
muestrarouter.post("/create",verifyToken, muestraController.createMuestras);
muestrarouter.patch("/edit/:id",verifyToken, muestraController.editMuestras);

module.exports = muestrarouter;