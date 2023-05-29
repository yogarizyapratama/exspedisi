const Logistik = require("../models/logistik");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

Logistik.sync();
exports.GET = async (req, res, next) => {
  try {
    const data = await Logistik.findAll({
      attributes: [
        "id",
        "logistic_name",
        "amount",
        "destination_name",
        "origin_name",
        "duration",
      ],
    });

    if (data) return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

exports.GETPARAMS = async (req, res, next) => {
  const { origin_name, destination_name } = req.query;

  if (origin_name || destination_name) {
    try {
      const data = await Logistik.findAll({
        where: {
          destination_name: {
            [Op.like]: `%${destination_name}%`,
          },
          origin_name: {
            [Op.like]: `%${origin_name}%`,
          },
        },
        attributes: [
          "id",
          "logistic_name",
          "amount",
          "destination_name",
          "origin_name",
          "duration",
        ],
      });
      if (data) return res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({
        message: "server error",
        error: error.message,
      });
    }
  }
};

exports.CREATE = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const logistikData = {
    logistic_name: req.body.logistic_name,
    amount: req.body.amount,
    destination_name: req.body.destination_name,
    origin_name: req.body.origin_name,
    duration: req.body.duration,
  };

  Logistik.create(logistikData)
    .then((logistik) => {
      res.status(201).json({
        message: "data logistik berhasil di tambahkan",
        logistik,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
