const apirouter = require("express").Router();

const userrouter = require("./usersRouter");

apirouter.use("/users", userrouter);

module.exports = apirouter;
