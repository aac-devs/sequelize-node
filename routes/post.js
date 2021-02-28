const express = require("express");
const router = express.Router();
const Post = require("../database/models/post");
const User = require("../database/models/user");

// INDEX /api/posts
router.get("/", (req, res) => {
  Post.findAll({
    // Se incluye el modelo usuario, del cual solo se muestra el nombre
    include: {
      model: User,
      as: "author",
      attributes: ["name"],
    },
    // De cada post solo se devuelven 'title' y 'body'
    attributes: ["title", "body"],
  }).then((posts) => {
    res.json(posts);
  });
});

// CREATE /api/posts
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
  }).then((posts) => {
    res.status(201).json(posts);
  });
});

// READ /api/posts/:id
router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id).then((post) => {
    res.json(post);
  });
});

// UPDATE /api/posts/:id
router.patch("/:id", (req, res) => {
  // Devuelve un Array con la cantidad de registros actualizados
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
        // title: "Título",
      },
    }
  ).then((result) => {
    res.json(result);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  // Devuelve la cantidad de registros eliminados
  Post.destroy({
    where: {
      id: req.params.id,
      // title: "Otros títulos", // Parámetro de búsqueda
    },
  }).then((result) => {
    res.json(result);
  });
});

module.exports = router;
