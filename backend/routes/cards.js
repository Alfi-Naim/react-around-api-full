const cardsRouter = require('express').Router();

const bodyParser = require('body-parser').json();

const { getCards, deleteCard, createCard, likeCard, unlikeCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.post('/cards', bodyParser, createCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', unlikeCard);

module.exports = cardsRouter;
