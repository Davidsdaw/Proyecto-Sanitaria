const apirouter = require("express").Router();

const cassetterouter = require("./cassetteRouter");

apirouter.use("/cassette", cassetterouter);

module.exports = apirouter;
