const db = require("../db");
const bcrypt = require("bcryptjs");

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db
    .execute("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ])
    .catch((error) => {
      if (error.code === "ER_DUP_ENTRY") {
        console.error("Email already exists", email);
        throw new Error("Email is already registered");
      } else {
        console.error("Database error:", error);
        throw error;
      }
    });
  return result.insertId;
}

async function getUserByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  // if (rows.length === 0) {
  //   console.error("Email doesn't exist", email);
  //   throw new Error("Email doesn't exist");
  // }
  return rows[0];
}

module.exports = { createUser, getUserByEmail };
