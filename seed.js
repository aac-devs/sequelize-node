const sequelize = require("./database/db");
const Post = require("./database/models/post");
const Address = require("./database/models/address");
const User = require("./database/models/user");
const Band = require("./database/models/band");
require("./database/associations");

// Usuarios:
const users = [
  { name: "Sarita", email: "sarita@mail.com", age: 7 },
  { name: "Juank", email: "juank@mail.com", age: 16 },
  { name: "Andres", email: "andres@mail.com", age: 40 },
  { name: "Lili", email: "lili@mail.com", age: 51 },
  { name: "Mariajose", email: "mariajose@mail.com", age: 11 },
];

// Direcciones:
const addresses = [
  { street: "Direccion Sarita", residentId: 1 },
  { street: "Direccion Juank", residentId: 2 },
  { street: "Direccion Andres", residentId: 3 },
  { street: "Direccion Lili", residentId: 4 },
  { street: "Direccion Mariajo", residentId: 5 },
];

// Entradas
const posts = [
  { title: "Foo", body: "Bar 1", authorId: 1 },
  { title: "Foo", body: "Bar 2", authorId: 1 },
  { title: "Title", body: "Bar 3", authorId: 2 },
  { title: "Yo que se", body: "Bar 4", authorId: 2 },
  { title: "Me da igual", body: "Bar 5", authorId: 3 },
  { title: "Todo", body: "Bar 6", authorId: 3 },
  { title: "Foo", body: "Bar 7", authorId: 4 },
];

/*
NOTA: Genera problemas al grabar datos de las direcciones y los posts a la primera,
-- Se debe ejecutar primero el llenado de usuarios únicamente.
-- Deshabilitar el llenado de usuarios y habilitar los otros dos.
Lo que obliga a ejecutarse dos veces el 'node seed'
PD: Verificar que las tablas estén vacías antes de llenarlas: { force: true } desde app.js
**** Volver a { force: false } en app.js antes de ejecutar app.js para que no se limpien las tablas de nuevo.
*/

sequelize
  .sync({ force: false })
  .then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
  })
  // .then(() => {
  //   // Rellenar usuarios
  //   users.forEach((user) => User.create(user));
  // });
  // .then(() => {
  //   // Rellenar direcciones
  //   addresses.forEach((address) => Address.create(address));
  // })
  // .then(() => {
  //   // Rellenar posts
  //   posts.forEach((post) => Post.create(post));
  // });
  // .then(async () => {  // 1ra forma de crear users y bands
  //   let band1 = await Band.create(
  //     {
  //       name: "Alquimia",
  //       type: "Salsa",
  //       users: [
  //         { name: "Lucia", age: 18, email: "lucia@mail.com" },
  //         { name: "Alberto", age: 22, email: "alberto@mail.com" },
  //       ],
  //     },
  //     {
  //       include: "users",
  //     }
  //   );
  // });

  // .then(async () => {
  //   // 2da forma de crear users y bands
  //   let user1 = await User.create({
  //     name: "Sergio",
  //     age: 38,
  //     email: "sergio@mail.com",
  //   });
  //   let user2 = await User.create({
  //     name: "Monica",
  //     age: 44,
  //     email: "monica@mail.com",
  //   });

  //   let band2 = await Band.create({
  //     name: "Los Hermanos Rosario",
  //     type: "Merenge",
  //   });

  //   band2.addUsers([user1, user2]);
  // });

  .then(async () => {
    // 3da forma de crear users y bands
    let user1 = await User.create({
      name: "Sergiodos",
      age: 38,
      email: "sergio2@mail.com",
    });
    let user2 = await User.create({
      name: "Monicados",
      age: 44,
      email: "monica2@mail.com",
    });

    let band2 = await Band.create({
      name: "Grupo Niche",
      type: "Salsa",
    });

    band2.addUser(user1);
    band2.addUser(user2);

    let user3 = await User.create({
      name: "paula",
      age: 38,
      email: "paula@mail.com",
    });

    user3.setBands([band2]);
  });
