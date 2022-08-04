const express = require('express');

const { generateToken } = require('./crypto');

const login = express.Router();
login.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: generateToken() });
});
module.exports = { login };
