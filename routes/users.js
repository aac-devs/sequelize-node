const { Router } = require("express");
const User = require("../database/models/user");

const router = Router();

router.get("/", (req, res) => {
  // Graba un registro en la tabla User
  // User.create({
  //   name: "Juan Camilo",
  //   birthday: new Date(2004, 3, 17),
  // })
  //   .then((user) => {
  //     res.json(user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json("Hubo un error en la grabación de usuario en DB");
  //   });

  // Lee todos los registros de la tabla User
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Hubo un error en la grabación de usuario en DB");
    });
});

module.exports = router;
