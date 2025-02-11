const apirouter = require("express").Router();

const userrouter = require("./usersRouter");
const muestrarouter = require("./muestraRouter");
const cassetterouter = require("./cassetteRouter");

apirouter.use("/users", userrouter);
apirouter.use("/muestra", muestrarouter);
apirouter.use("/cassette",cassetterouter)


module.exports = apirouter;
