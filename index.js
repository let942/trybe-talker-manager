const express = require('express');
const bodyParser = require('body-parser');
const { talker } = require('./talker');
const { talkerId } = require('./talkerId');
const { login } = require('./login');
const { postTalker } = require('./postTalker');
const { putTalkerId } = require('./putTalkerId');
const { deleteTalkerId } = require('./deleteTalkerId');
const { search } = require('./search');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar ;)
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/search', search);
app.get('/talker/:id', talkerId);
app.post('/login', login);
app.post('/talker', postTalker);
app.put('/talker/:id', putTalkerId);
app.delete('/talker/:id', deleteTalkerId);

app.listen(PORT, () => {
  console.log('Online');
});
