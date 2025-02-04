const usersRouter = require("express").Router();
const usersController = require("./../controllers/usersController");

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.delete("/:id", usersController.deleteUser);
usersRouter.post("/", usersController.createUser);


module.exports = usersRouter;