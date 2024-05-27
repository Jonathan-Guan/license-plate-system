var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.1.151",
  user: "user",
  password: "pass",
  database: "license_plate_system",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
