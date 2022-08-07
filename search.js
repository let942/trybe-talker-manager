const express = require('express');

const search = express.Router();

const fs = require('fs/promises');

const {
  tokenValidation,
} = require('./middlewares');

search.use(
  tokenValidation,

);

const TALKERFILE = 'talker.json';

search.get('/talker/search', async (req, res) => {
  const { q } = req.query;

  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);
  const fiteredTalkers = talkers.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));

  return res.status(200).json(fiteredTalkers);
});

module.exports = { search }; 