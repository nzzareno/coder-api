const db = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "coderdatos",
  },
  pool: { min: 0, max: 7 },
};

module.exports = {db};
