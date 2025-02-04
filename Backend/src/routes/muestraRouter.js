const apirouter = require("express").Router();

const muestrarouter = require("./muestraRouter");

apirouter.use("/muestra", muestrarouter);

module.exports = apirouter;