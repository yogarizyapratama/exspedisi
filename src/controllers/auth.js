const User = require("../models/users");
const Authentication = require("../middleware/authentication");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

User.sync();

exports.Login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let msisdn = req.body.msisdn;

  if (msisdn.startsWith("0")) {
    msisdn = "62" + msisdn.substring(1);
  } else {
    msisdn = "62" + req.body.msisdn;
  }

  const password = req.body.password;

  try {
    const userData = await User.findOne({
      where: {
        msisdn: msisdn,
      },
    });

    const user = {
      id_user: userData.id,
    };

    const jwt = Authentication.CreateToken(user);

    if (userData) {
      const isPasswordMatch = await bcrypt.compare(password, userData.password);
      if (isPasswordMatch) {
        res.status(200).json({
          jwt,
        });
      } else {
        res.json({
          message: "password mismatch",
        });
      }
    } else {
      res.status(404).json({
        message: "akun tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.Register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let msisdn = req.body.msisdn;

  if (msisdn.startsWith("0")) {
    msisdn = "62" + msisdn.substring(1);
  } else {
    msisdn = "62" + req.body.msisdn;
  }

  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const saveData = {
    msisdn: msisdn,
    username: username,
    name: name,
    password: hashedPassword,
  };

  try {
    const findMsisdn = await User.findOne({
      where: {
        msisdn: msisdn,
      },
    });

    const findUsername = await User.findOne({
      where: {
        username: username,
      },
    });

    if (findMsisdn) {
      return res.status(200).json({
        message: "msisdn sudah digunakan",
      });
    }

    if (findUsername) {
      return res.status(200).json({
        message: "username sudah digunakan",
      });
    }

    await User.create(saveData);

    res.status(201).json({
      message: "akun berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.User = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id_user = req.user.id_user;

  console.log(id_user);
  try {
    const data = await User.findOne({
      where: {
        id: id_user,
      },
    });

    if (data) {
      res.status(200).json({
        username: data.username,
        name: data.name,
        msisdn: data.msisdn,
      });
    } else {
      res.status(404).json({
        message: "data user tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
