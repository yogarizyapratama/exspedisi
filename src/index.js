const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const auth = require("./routes/auth");
const logistik = require("./routes/logistik");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port 5000");
});

app.use("/auth", auth);
app.use("/logistik", logistik);
