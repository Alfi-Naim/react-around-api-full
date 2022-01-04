const User = require('../models/user');

const ERROR_INVALIDE_INPUT = 400;
const ERROR_USER_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.name = 'UserIdNotFound'
      throw error;
    })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserIdNotFound') return res.status(ERROR_USER_NOT_FOUND).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => res.status(200).send({ message: 'user created' }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.name = 'UserIdNotFound'
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserIdNotFound') return res.status(ERROR_USER_NOT_FOUND).send({ message: err.message });
      if (err.name === 'ValidationError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.name = 'UserIdNotFound'
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserIdNotFound') return res.status(ERROR_USER_NOT_FOUND).send({ message: err.message });
      if (err.name === 'ValidationError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};
