const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Logistik = sequelize.define(
  "logistik",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    logistic_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    destination_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Logistik;
