const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/auth");
const JWT = require("../middleware/authentication");

const router = express.Router();

router.get(
  "/login",
  [
    body("msisdn").notEmpty().isNumeric(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  controller.Login
);
router.post(
  "/register",
  [
    body("msisdn").notEmpty().isNumeric(),
    body("username").notEmpty(),
    body("name").notEmpty(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  controller.Register
);
router.get("/user", JWT.VerifyToken, controller.User);

module.exports = router;
