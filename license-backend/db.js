const mysql = require('mysql2');
const db = mysql.createConnection({
  host: "192.168.1.151",
  user: "user",
  password: "pass",
  database: "license_plate_system",
});

// Promisify for Node.js async/await.
const dbPromise = db.promise();

module.exports = dbPromise;