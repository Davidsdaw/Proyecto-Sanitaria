const usersRouter = require("express").Router();
const usersController = require("./../controllers/usersController");
const {verifyToken,checkRole} = require("./middlewares");


//AGREGAR PARA PROTEGER LAS RUTAS
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.delete("/delete/:id", usersController.deleteUser);
usersRouter.post("/register", usersController.createUser);
usersRouter.patch("/edit/:id", usersController.editUser);
usersRouter.post("/login", usersController.loginUser);



module.exports = usersRouter;