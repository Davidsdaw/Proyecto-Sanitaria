const imagenrouter = require("express").Router();
const imagenController = require("./../controllers/ImagenController");
const {verifyToken,checkRole} = require("./middlewares");
const multer = require ('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

imagenrouter.get("/",verifyToken, imagenController.getImagenById);
imagenrouter.get("/:id",verifyToken, imagenController.getImagenById);
imagenrouter.delete("/delete/:id",verifyToken, imagenController.deleteImagen);
imagenrouter.post("/create", verifyToken, upload.single("imagen"), imagenController.createImagen);

module.exports = imagenrouter;