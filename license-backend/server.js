const express = require("express");
//const router = express.Router();

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db.js");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = getFileExtension(file.originalname); // Get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

function getFileExtension(filename) {
  return filename.split(".").pop(); // Extract file extension
}

const upload = multer({ storage: storage });

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/search", async (req, res) => {
  const { startDate, endDate, licensePlate } = req.query;
  //TODO: fix issue where end time doesn't consider full day (add an extra day to end time?)

  let query = "SELECT * FROM license_entries WHERE 1=1 ";
  let data = [];
  if (startDate) {
    query += "AND entry_time >= ? ";
    data.push(startDate);
  }
  if (endDate) {
    query += "AND entry_time <= ? ";
    data.push(endDate);
  }

  if (licensePlate) {
    query += "AND license = ?";
    data.push(licensePlate);
  }

  db.query(query, data, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  const { license, entry_date } = req.body;

  if (!license || !entry_date || !req.file) {
    return res
      .status(400)
      .json({ error: "License, entry_time, and image are required" });
  }

  let query =
    "INSERT INTO license_entries (license, entry_time, image_path) VALUES (?, ?, ?)";
  db.query(query, [license, entry_date, req.file.path], (err, results) => {
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
