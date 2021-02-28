const Post = require("./models/post");
const Address = require("./models/address");
const User = require("./models/user");
const { drop } = require("./db");

// Relación uno a uno
// El usuario tiene una dirección:
// Añade una clave foránea del tipo userId a la tabla addresses:
User.hasOne(Address, { as: "residency", foreignKey: "residentId" });
// La dirección pertenece al usuario:
// Añade una clave userId a la tabla addresses
Address.belongsTo(User, { as: "resident", foreignKey: "residentId" });

// Relación uno a muchos
// Usuario va a tener muchos posts o publicaciones
// Se añade una clave userId a la tabla posts
User.hasMany(Post, { as: "publications", foreignKey: "authorId" });
// Se añade una clave userId a la tabla posts
Post.belongsTo(User, { as: "author" });



//
//
//
//
//
//
//
//
//

// const seed = async () => {
//   await User.create({
//     name: "Sarita",
//     email: "sarita@mail.com",
//     age: 7,
//   });
//   await User.create({
//     name: "Juank",
//     email: "juank@mail.com",
//     age: 16,
//   });
//   await User.create({
//     name: "Andres",
//     email: "andres@mail.com",
//     age: 40,
//   });
//   await User.create({
//     name: "Lili",
//     email: "lili@mail.com",
//     age: 51,
//   });
//   await User.create({
//     name: "Mariajose",
//     email: "mariajose@mail.com",
//     age: 11,
//   });
//   await Address.create({
//     street: "Direccion Sarita",
//     resident_id: 1,
//   });
//   await Address.create({
//     street: "Direccion Juank",
//     resident_id: 2,
//   });
//   await Address.create({
//     street: "Direccion Andres",
//     resident_id: 3,
//   });
//   await Address.create({
//     street: "Direccion Lili",
//     resident_id: 4,
//   });
//   await Address.create({
//     street: "Direccion Mariajo",
//     resident_id: 5,
//   });
// };
