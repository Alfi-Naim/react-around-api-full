const Card = require('../models/card');

const ERROR_INVALIDE_INPUT = 400;
const ERROR_CARD_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.name = 'CardIdNotFound'
      throw error;
    })
    .then(() => res.status(200).send({ message: 'card deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      if (err.name === 'CardIdNotFound') return res.status(ERROR_CARD_NOT_FOUND).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.name = 'CardIdNotFound'
      throw error;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      if (err.name === 'CardIdNotFound') return res.status(ERROR_CARD_NOT_FOUND).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.name = 'CardIdNotFound'
      throw error;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_INVALIDE_INPUT).send({ message: err.message });
      if (err.name === 'CardIdNotFound') return res.status(ERROR_CARD_NOT_FOUND).send({ message: err.message });
      res.status(ERROR_DEFAULT).send({ message: err.message })
    });
};