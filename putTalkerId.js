const express = require('express');

const postTalker = express.Router();

const fs = require('fs/promises');

const {
  tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./middlewares');

postTalker.use(
  tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
);

const TALKERFILE = 'talker.json';

const putTalkerId = express.Router();

putTalkerId.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);
  const especificTalker = talkers.findIndex((talker) => talker.id === Number(id));
  const talker = talkers.find((person) => person.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  talkers[especificTalker] = { ...talkers[especificTalker], name, age, talk: { watchedAt, rate } };
  const newTalker = talkers[especificTalker];
  await fs.writeFile(talkers);

  res.status(200).json(newTalker);
});

module.exports = { putTalkerId }; 