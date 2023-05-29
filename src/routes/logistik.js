const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/logistik");
const JWT = require("../middleware/authentication");

const router = express.Router();

router.get("/kurir-rate", JWT.VerifyToken, controller.GET);

router.get("/kurir-rate/params", JWT.VerifyToken, controller.GETPARAMS);

router.post(
  "/kurir-rate",
  [
    body("logistic_name").notEmpty(),
    body("amount").isNumeric().notEmpty(),
    body("destination_name").notEmpty(),
    body("origin_name").notEmpty(),
    body("duration").notEmpty(),
  ],
  JWT.VerifyToken,
  controller.CREATE
);

module.exports = router;
