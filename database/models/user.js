const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo",
        },
        isAlpha: {
          args: true,
          msg: "El nombre solo puede contener letras",
        },
        len: {
          args: [3, 255],
          msg: "El nombre tiene que estar entre 3 y 255 caracteres",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo válido",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "La edad tiene que ser un número entero",
        },
        max: {
          args: 150,
          msg: "La edad tiene que ser real",
        },
        min: {
          args: 1,
          msg: "La edad tiene que ser mayor o igual que uno",
        },
        esPar(value) {
          if (value % 2) {
            throw new Error("La edad tiene que ser un número par");
          }
        },
      },
    },
    // Si es 0 es usuario normal, si es 1 es administrador
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
