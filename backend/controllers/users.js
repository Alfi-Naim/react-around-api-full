const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/notFoundError'); //404
const BadRequestError = require('../errors/badRequestError'); //400
const UnauthorizedError = require('../errors/unauthorizedError'); //401
const ConflictError = require('../errors/conflictError'); //409

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with that id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with that id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Bad request')
      }
      res.status(200).send({ message: 'user created' })
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('User already exists');
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with that id')
      }
      res.status(200).send(user)
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with that id')
      }
      res.status(200).send(user)
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(NODE_ENV);
      console.log(JWT_SECRET);
      if (!user) {
        throw new BadRequestError('Bad request');
      }
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' })
      });
    })
    .catch(() => {
      next(new UnauthorizedError('Wrong email or password'));
    });
};