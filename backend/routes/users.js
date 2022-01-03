const validator = require("validator");
const usersRouter = require('express').Router();
const bodyParser = require('body-parser').json();
const { celebrate, Joi } = require('celebrate');

const { getUsers, getUserById, updateUser, updateAvatar } = require('../controllers/users');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserById);

usersRouter.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    })
  }), getUserById);

usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }), bodyParser, updateUser);

usersRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }), bodyParser, updateAvatar);

module.exports = usersRouter;
