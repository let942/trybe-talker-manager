const express = require('express');

const { generateToken } = require('./crypto');

// const TALKERFILE = 'talker.json';

const login = express.Router();
login.post('/login', async (req, res) =>
  res.status(200).send({ token: generateToken() }));

module.exports = { login };
