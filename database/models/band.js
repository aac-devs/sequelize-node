const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

// Una banda de música
class Band extends Model {}

Band.init(
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "band",
    timestamps: false,
  }
);

module.exports = Band;
