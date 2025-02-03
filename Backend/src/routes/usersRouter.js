const usersRouter = require("express").Router();
const usersController = require("./../controllers/usersController");

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);

module.exports = usersRouter;