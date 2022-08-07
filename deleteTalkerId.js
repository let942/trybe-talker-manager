const express = require('express');

const deleteTalkerId = express.Router();

const fs = require('fs/promises');

const {
  tokenValidation,
} = require('./middlewares');

deleteTalkerId.use(
  tokenValidation,

);

const TALKERFILE = 'talker.json';

deleteTalkerId.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);
  const fiteredTalkers = talkers.filter((r) => r.id !== Number(id));

  await fs.writeFile(TALKERFILE, JSON.stringify(fiteredTalkers));
  return res.status(204).json();
});

module.exports = { deleteTalkerId }; 