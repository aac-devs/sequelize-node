const { Router } = require("express");
const Address = require("../database/models/address");
const User = require("../database/models/user");

const router = Router();

router.get("/", (req, res) => {
  Address.findAll({
    // include: "address", // Incluye los registros de la tabla Address que se relacionan con User.
    include: {
      // Opción en la que se pueden seleccionar los campos a mostrar.
      model: User,
      as: "resident",
      attributes: ["name", "age"],
    },
    attributes: ["street"],
  }).then((addresses) => res.json(addresses));
});

module.exports = router;
