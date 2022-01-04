const usersRouter = require('express').Router();

const bodyParser = require('body-parser').json();

const { getUsers, getUserById, createUser, updateUser, updateAvatar } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', bodyParser, createUser);
usersRouter.patch('/users/me', bodyParser, updateUser);
usersRouter.patch('/users/me/avatar', bodyParser, updateAvatar);

module.exports = usersRouter;
