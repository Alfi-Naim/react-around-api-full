const express = require('express');
const helmet = require('helmet');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');


app.use((req, res, next) => {
  req.user = {
    _id: '61bc7b20725a26b2225f19f4' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use(helmet());

app.use('/', cardsRouter, usersRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
