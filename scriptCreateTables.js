// const knex = require("knex");
// const { db } = require("./db/db");
// const { liteDb } = require("./db/liteDb");
// const dbProductos = knex(db);
// const dbMensajes = knex(liteDb);

// async function tablesCreation() {
//   const existP = await dbProductos.schema.hasTable("productos");

//   if (!existP) {
//     await dbProductos.schema.createTable("productos", (table) => {
//       table.increments("id").primary().notNullable();
//       table.string("title", 50).notNullable();
//       table.decimal("price").notNullable();
//       table.string("img", 400);
//     });
//   }

//   const existM = await dbMensajes.schema.hasTable("mensajes");
//   if (!existM) {
//     await dbMensajes.schema.createTable("mensajes", (table) => {
//       table.increments("id").primary().notNullable();
//       table.string("email", 50).notNullable();
//       table.string("msg", 200).notNullable();
//       table.timestamp("fecha").defaultTo(dbMensajes.fn.now());
//       table.string("name", 50).notNullable();
//       table.string("lastname", 50).notNullable();
//       table.string("alias", 50).notNullable();
//       table.string("avatar", 400).notNullable();
//       table.integer("edad").notNullable();
//     });
//   }
// }

// module.exports = { tablesCreation };
