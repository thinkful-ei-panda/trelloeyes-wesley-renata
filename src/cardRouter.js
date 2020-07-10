const express = require('express');
const cardRouter = express.Router();
const {cards} = require('./data.js');
const logger = require('./logger.js');
const {v4: uuid}= require('uuid');

cardRouter
  .route('/')
  .get((req, res) => {
    res.json(cards);
  })
  .post(express.json(), (req,res) => {
    const {title,content} = req.body;
    if(!title || !content){
      res.status(400).send('requires title and contents');
    }

    const card = {
      id:uuid(),
      title,
      content,
    };

    cards.push(card);
    res.json(card);
  });

cardRouter.get('/:id', (req, res) =>{
  const {id} = req.params;
  const card = cards.find(c => c.id == id);
  
  if(!card){
    logger.error(`Card with id ${id} isn't found`);
    return res.status(404).send('Cards not found');
  }
  res.json(card);
});

cardRouter.delete('/:id', express.json(), (req,res) => {
  const {id} = req.params;

  const cardIndex = cards.findIndex(card => card.id == id);

  if(cardIndex===-1){
    return res.status(400).send('Cannot find card id');
  }else{
    cards.splice(cardIndex,1);
    return res.status(204).end();
  }
});

module.exports = cardRouter;