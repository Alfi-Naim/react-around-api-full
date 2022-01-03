const express = require('express');
const helmet = require('helmet');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', cardsRouter, usersRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
