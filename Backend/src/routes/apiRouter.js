const apirouter = require("express").Router();

const userrouter = require("./usersRouter");
const muestrarouter = require("./muestraRouter");
const cassetterouter = require("./cassetteRouter");
const imagenrouter = require("./imagenRouter");


apirouter.use("/users", userrouter);
apirouter.use("/muestra", muestrarouter);
apirouter.use("/cassette",cassetterouter)
apirouter.use("/imagen",imagenrouter)


module.exports = apirouter;
