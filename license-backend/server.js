const express = require("express");
//const router = express.Router();

const cors = require("cors");
const fs = require('fs');
const path = require('path');
const db = require("./db.js");
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get("/hello", async (req, res) => {
  const { startDate, endDate, licensePlate } = req.query;
  //TODO: fix issue where end time doesn't consider full day (add an extra day to end time?)

  let query = "SELECT * FROM license_entries WHERE 1=1 ";

  if (startDate) query += "AND entry_time >= ? ";
  if (endDate) query += "AND entry_time <= ? ";
  if (licensePlate) query += "AND licenses = ?";

  db.query(query, [startDate, endDate, licensePlate], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});







app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
