const { Router } = require("express");
const Address = require("../database/models/address");
const Post = require("../database/models/post");
const User = require("../database/models/user");

const router = Router();

// Muestra todos los usuarios
router.get("/", (req, res) => {
  User.findAll({
    // include: "address", // Incluye los registros de la tabla Address que se relacionan con User.
    include: [
      {
        model: Address,
        as: "residency",
        attributes: ["street"],
      },
      {
        model: Post,
        as: "publications",
        attributes: ["title", "body"],
        // Con where se pueden filtrar los registros
        // Quiere decir que solo devuelve los usuarios en donde el título de una de sus publicaciones sea 'Foo'
        where: {
          title: "Foo",
        },
      },
    ],
    attributes: ["name", "age"],
  }).then((users) => res.json(users));
});

// Ver la dirección de usuario /api/users/:id/residency
router.get("/:id/residency", (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    user.getResidency().then((residency) => {
      res.json(residency);
    });
  });
});

// Ver los posts de usuario /api/users/:id/publications
router.get("/:id/publications", (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    user.getPublications().then((publications) => {
      res.json(publications);
    });
  });
});

// Ver las bandas del usuario /api/users/:id/bands
router.get("/:id/bands", (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    user.getBands({ attributes: ["name", "type"] }).then((bands) => {
      res.json(bands);
    });
  });
});

// CREATE /api/users
router.post("/", (req, res) => {
  // Creación únicamente de usuario:
  // const { name, email, age, role } = req.body;
  // User.create({
  //   name,
  //   email,
  //   age,
  //   role,
  // })
  //   .then((user) => {
  //     res.json(user);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });

  // Creación de usuario que llega con la dirección para asociarla a la tabla Address
  const { name, email, age, role, street } = req.body;
  User.create(
    {
      name,
      email,
      age,
      role,
      residency: {
        street,
      },
    },
    {
      include: "residency",
    }
  )
    .then((user) => {
      // Address.create({ street: req.body.street }).then((street) => {
      // user.setResidency(street).then((result) => {
      res.json(user);
      // });
      // });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// router.get("/", (req, res) => {
//   // Graba un registro en la tabla User
//   // User.create({
//   //   name: "Juan Camilo",
//   //   birthday: new Date(2004, 3, 17),
//   // })
//   //   .then((user) => {
//   //     res.json(user);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //     res.status(400).json("Hubo un error en la grabación de usuario en DB");
//   //   });

//   // Lee todos los registros de la tabla User
//   User.findAll()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json("Hubo un error en la grabación de usuario en DB");
//     });
// });

module.exports = router;
