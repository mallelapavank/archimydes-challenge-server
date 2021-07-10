const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require("./routes/api");
app.use("/", apiRoutes);

const db = require("./models");
const PORT = process.env.PORT || 3001;

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});

module.exports = app;
