const cardRouter = express.Router();
const express = require('express');
const {cards} = require('./data.js');
const logger = require('./logger.js');

cardRouter.get('/card', (req, res) => {
  res.json(cards);
});

cardRouter.get('/card/:id', (req, res) =>{
  const {id} = req.params;
  const card = cards.find(c => c.id == id);
  
  if(!card){
    logger.error(`Card with id ${id} isn't found`);
    return res.status(404).send('Cards not found');
  }
  res.json(card);
});
module.exports = cardRouter;