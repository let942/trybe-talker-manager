const express = require('express');

const TALKERFILE = 'talker.json';
const fs = require('fs/promises');

const postTalker = express.Router();
const {
  tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./middlewares');

postTalker.use(
  // tokenValidation,
  emailValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
);

postTalker.post('/talker', async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');
  const talkers = JSON.parse(fileTalker);
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },

  };
  talkers.push(newTalker);

  return res.status(201).json(newTalker);
});

module.exports = { postTalker };