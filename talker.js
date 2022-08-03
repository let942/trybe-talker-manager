const express = require('express');

// const fs = require('fs/promises');

const talker = express.Router();

talker.get('/talker', (req, res) => {
  const newReturn = [];

  return res.status(200).json(newReturn);
});

module.exports = { talker }; 