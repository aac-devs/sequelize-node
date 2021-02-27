require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./database/db");

const port = process.env.PORT || 4000;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas:
app.use("/api/posts", require("./routes/post"));
app.use("/api/users", require("./routes/users"));

// Server running:
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Conectarse a la base de datos:
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Conectado a BD");
    })
    .catch((err) => {
      console.log("Error al conectar DB", err);
    });
});
