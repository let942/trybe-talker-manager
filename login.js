const express = require('express');

const { generateToken } = require('./crypto');

const login = express.Router();

login.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  if (!(email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return res.status(200).send({ token: generateToken() });
});

module.exports = { login };
