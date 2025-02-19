const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors=require("cors")
app.use(cors());

const sequelize = require("./database/db");

require("./database/associations");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiroutes = require("./routes/apiRouter");
app.use("/sanitaria", apiroutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor arrancado alojado en : http://localhost:${PORT}`);

  sequelize
    .sync({ force: false })
    .then(() => console.log("Tablas sincronizadas"));
});
