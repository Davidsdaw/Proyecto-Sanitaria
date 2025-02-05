const apirouter = require("express").Router();

const userrouter = require("./usersRouter");
const muestrarouter = require("./muestraRouter");

apirouter.use("/users", userrouter);
apirouter.use("/muestra", muestrarouter);


module.exports = apirouter;
