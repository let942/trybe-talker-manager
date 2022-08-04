const express = require('express');

const fs = require('fs/promises');

const TALKERFILE = 'talker.json';

const talker = express.Router();

talker.get('/talker', async (req, res) => {
  // const newReturn = [];

  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);

  return res.status(200).send(talkers);
});

module.exports = { talker }; 