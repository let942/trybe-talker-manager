const express = require('express');

const fs = require('fs/promises');
// const { nextTick } = require('process');

const TALKERFILE = 'talker.json';

const talker = express.Router();

talker.get('/talker', async (req, res) => {

  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);

  return res.status(200).send(talkers);
});

module.exports = { talker }; 