const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const auth = require("./routes/auth");
const logistik = require("./routes/logistik");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

const specs = require("../api-docs.json");

// Route untuk tampilan Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log("listening on port " + port);
});

app.use("/auth", auth);
app.use("/logistik", logistik);

module.exports = app;
