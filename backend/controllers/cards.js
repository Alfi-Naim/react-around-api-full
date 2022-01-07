const Card = require('../models/card');

const NotFoundError = require('../errors/notFoundError'); //404
const BadRequestError = require('../errors/badRequestError'); //400
const ForbiddenError = require('../errors/forbiddenError'); //403

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new ForbiddenError('Invalid input');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('card not found');
      }
      else if (card.owner.toString() !== ownerId) {
        throw new ForbiddenError('Requested resource is forbidden ' + card.owner + " , " + ownerId + " , " + card + " , " + req.user);
      }
      Card.deleteOne({ _id: req.params.cardId })
        .then(() => {
          res.status(200).send({ message: 'card deleted' })
        })
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError('Bad request')
      next(err)
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('card not found');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError('Bad request')
      next(err)
    })
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('card not found');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError('Bad request')
      next(err)
    })
    .catch(next);
};