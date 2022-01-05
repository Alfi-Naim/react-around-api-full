const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCards, deleteCard, createCard, likeCard, unlikeCard } = require('../controllers/cards');

const validateURL = (value, helpers) => {
  console.log(value);
  console.log("!" + validator.isURL(value));
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), createCard);

cardsRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), unlikeCard);

module.exports = cardsRouter;
