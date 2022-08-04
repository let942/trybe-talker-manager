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

function noReq(req, res, alert) {
  if (!req) {
    return res.status(401).json({ message: alert });
  }

}

talker.post('/talker', (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const token = req.headers.authorization;
  noReq(token, res, 'Token não encontrado');
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }

});

module.exports = { talker }; 