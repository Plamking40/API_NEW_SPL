const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spc_admin",
});

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "admin_spl",
//   password: "#spl!1001admin",
//   database: "admin_sql",
// });

module.exports = conn;
