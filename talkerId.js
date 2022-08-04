const express = require('express');

const fs = require('fs/promises');

const TALKERFILE = 'talker.json';

const talkerId = express.Router();

talkerId.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const fileTalker = await fs.readFile(TALKERFILE, 'utf8');

  const talkers = JSON.parse(fileTalker);

  const person = talkers.find((r) => r.id === Number(id));

  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(person);
});

module.exports = { talkerId }; 