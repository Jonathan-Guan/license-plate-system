const express = require("express");
//const router = express.Router();

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db.js");
const authRoutes = require("./routes/auth");

const bodyParser = require('body-parser');

const multer = require("multer");
const { match } = require("assert");
const { count } = require("console");
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
const config = require("./config");

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes.router);
app.use(bodyParser.json());



app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/search", authRoutes.authenticateToken,async (req, res) => {
  const {
    startDate,
    endDate,
    color,
    state,
    licensePlate,
    violation,
    page = 1,
    perPage = 50,
  } = req.query;

  let baseQuery =
    "SELECT \
    le.*, \
    CASE \
      WHEN pp.license IS NULL THEN 'Yes' \
      ELSE 'No' \
    END AS violation\
    FROM \
      license_entries AS le\
    LEFT JOIN \
      parking_permit AS pp \
    ON \
      le.license = pp.license WHERE 1=1 ";
  let countQuery =
    "SELECT count(*) as totalEntries \
    FROM \
      license_entries AS le\
    LEFT JOIN \
      parking_permit AS pp \
    ON \
      le.license = pp.license WHERE 1=1 ";
  let data = [];

  if (startDate) {
    baseQuery += "AND entry_time >= ? ";
    countQuery += "AND entry_time >= ? ";
    data.push(startDate);
  }
  if (endDate) {
    baseQuery += "AND entry_time <= DATE_ADD(?, INTERVAL 1 DAY) ";
    countQuery += "AND entry_time <= DATE_ADD(?, INTERVAL 1 DAY) ";
    data.push(endDate);
  }
  if (color) {
    baseQuery += "AND color = ? ";
    countQuery += "AND color = ? ";
    data.push(color);
  }
  if (state) {
    baseQuery += "AND state = ? ";
    countQuery += "AND state = ? ";
    data.push(state);
  }
  if (licensePlate) {
    // Partial match for licenses
    const matchPlate = `%${licensePlate}%`;
    baseQuery += "AND le.license LIKE ? ";
    countQuery += "AND le.license LIKE ? ";
    data.push(matchPlate);
  }
  if (violation === "Yes") {
    baseQuery += "AND le.license IS NULL ";
    countQuery += "AND le.license IS NULL ";
  } else if (violation === "No") {
    baseQuery += "AND le.license IS NOT NULL ";
    countQuery += "AND le.license IS NOT NULL ";
  }

  const offset = (page - 1) * perPage;
  baseQuery += "ORDER BY entry_time DESC LIMIT ? OFFSET ?";
  data.push(parseInt(perPage), offset);

  console.log(page, perPage);

  try {
    const [totalResult] = await db.query(
      countQuery,
      data.slice(0, data.length - 2)
    );
    const totalEntries = totalResult[0].totalEntries;

    // Query to get paginated results
    const [results] = await db.query(baseQuery, data);

    res.json({
      entries: results,
      totalEntries: totalEntries,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });

    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get/passes", authRoutes.authenticateToken, async (req, res) => {
  let { name, licensePlate, id, page = 1, perPage = 3 } = req.query;
  let data = [];
  let baseQuery = "SELECT * FROM parking_permit WHERE 1=1 ";
  let countQuery =
    "SELECT count(*) as totalEntries FROM parking_permit WHERE 1=1 ";

  if (name) {
    name = `%${name}%`;
    data.push(name);
    baseQuery += "AND name LIKE ? ";
    countQuery += "AND name LIKE ? ";
  }

  if (licensePlate) {
    licensePlate = `%${licensePlate}%`;
    data.push(licensePlate);
    baseQuery += "AND license LIKE ? ";
    countQuery += "AND license LIKE ? ";
  }

  if (id) {
    data.push(id);
    baseQuery += "AND id = ?";
    countQuery += "AND id = ?";
  }

  console.log(baseQuery);

  const offset = (page - 1) * perPage;
  baseQuery += "ORDER BY issue_date DESC LIMIT ? OFFSET ?";
  data.push(parseInt(perPage), offset);

  console.log(page, perPage);

  try {
    const [totalResult] = await db.query(
      countQuery,
      data.slice(0, data.length - 2)
    );
    const totalEntries = totalResult[0].totalEntries;

    // Query to get paginated results
    const [results] = await db.query(baseQuery, data);

    res.json({
      entries: results,
      totalEntries: totalEntries,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/colors", async (req, res) => {
  let query = "SELECT DISTINCT color FROM license_entries WHERE color != ''";

  try {
    const [results] = await db.query(query, []);
    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * json body:
 * name
 * issue_date
 * exp_date
 * license
 */

app.post("/edit_pass", authRoutes.authenticateToken, async (req, res) => {
  const { name, issue_date, exp_date, license, id } = req.body;
  const data = [name, issue_date, exp_date, license, id];
  if (!name || !issue_date || !exp_date || !license || !id) {
    console.log("missing field");
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "UPDATE parking_permit set name = ?, issue_date = ?, exp_date = ?, license = ? WHERE id = ?";

  try {
    const [results] = await db.query(query, data);
    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete(`/delete_pass/:id`, authRoutes.authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }
  const query = "DELETE FROM parking_permit WHERE id = ?";

  try {
    const [results] = await db.query(query, [id]);
    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * json body:
 * name
 * issue_date
 * exp_date
 * license
 */
app.post("/add_pass", authRoutes.authenticateToken, async (req, res) => {
  const { name, issue_date, exp_date, license } = req.body;

  if (!name || !issue_date || !exp_date || !license) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const data = [name, issue_date, exp_date, license];
  const query =
    "INSERT INTO parking_permit (name, issue_date, exp_date, license) VALUES (?, ?, ?, ?)";

  try {
    const [results] = await db.query(query, data);
    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Image:
 *
 * json body:
 * license
 * entry_date
 */
app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const { license, entry_date } = req.body;

  if (!license || !entry_date || !req.file) {
    return res
      .status(400)
      .json({ error: "License, entry_time, and image are required" });
  }
  const data = [license, entry_date, newPath];
  const newPath = `images/${path.basename(req.file.path)}`;

  const query =
    "INSERT INTO license_entries (license, entry_time, image_path) VALUES (?, ?, ?)";

  try {
    const [results] = await db.query(query, data);
    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
