const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const auth = require("../src/routes/auth");
const logistik = require("../src/routes/logistik");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/logistik", logistik);

module.exports = app;
