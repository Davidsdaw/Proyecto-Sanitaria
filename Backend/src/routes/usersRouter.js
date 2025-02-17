const usersRouter = require("express").Router();
const usersController = require("./../controllers/usersController");
const {verifyToken,checkRole} = require("./middlewares");


//AGREGAR PARA PROTEGER LAS RUTAS
usersRouter.get("/",verifyToken, usersController.getAllUsers);
usersRouter.get("/:id",verifyToken, usersController.getUserById);
usersRouter.delete("/delete/:id",verifyToken, usersController.deleteUser);
usersRouter.post("/register", usersController.createUser);
usersRouter.patch("/edit/:id", verifyToken, usersController.editUser);
usersRouter.post("/login", usersController.loginUser);
usersRouter.post("/forgot-password", usersController.forgotPassword);
usersRouter.post("/reset-password/:token", usersController.resetPassword);

module.exports = usersRouter;