const express = require('express');

const putTalkerId = express.Router();

const fs = require('fs/promises');

const {
  tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./middlewares');

putTalkerId.use(
  tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
);

const TALKERFILE = 'talker.json';

putTalkerId.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const newTalker = req.body;
  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);
  const oldTalker = talkers.find((r) => r.id === Number(id));
  if (!oldTalker) { return res(404).json('pessoa não encontrada'); }
  oldTalker.name = newTalker.name;
  oldTalker.age = newTalker.age;
  oldTalker.talk.watchedAt = newTalker.talk.watchedAt;
  oldTalker.talk.rate = newTalker.talk.rate;
  await fs.writeFile(TALKERFILE, JSON.stringify(talkers));
  return res.status(200).json(oldTalker);
});

module.exports = { putTalkerId }; 