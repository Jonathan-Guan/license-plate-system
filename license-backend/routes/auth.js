const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/user');
const config = require('../config');

const jwtSecret = config.jwtSecret;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("no JWT passed")
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log("bad JWT passed")
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userId = await createUser(email, password);
    res.status(201).send({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).send({ error: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    const user = await getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(password, " ", user.password)
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.email }, jwtSecret, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: 'Error logging in' });
  }
});

module.exports = {
  router,
  authenticateToken
};
