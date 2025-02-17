const imagenrouter = require("express").Router();
const imagenController = require("./../controllers/ImagenController");
const {verifyToken,checkRole} = require("./middlewares");

imagenrouter.get("/",verifyToken, imagenController.getImagenById);
imagenrouter.get("/:id",verifyToken, imagenController.getImagenById);
imagenrouter.delete("/delete/:id",verifyToken, imagenController.deleteImagen);
imagenrouter.post("/create",verifyToken, imagenController.createImagen);


module.exports = imagenrouter;