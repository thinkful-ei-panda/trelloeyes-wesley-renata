const express = require('express');
const listRouter = express.Router();
const {lists} = require('./data.js');
const logger = require('./logger.js');

listRouter
  .route('/')
  .get((req, res) => {
    res.json(lists);
  });

listRouter.get('/:id', (req, res) => {

  const{id} = req.params;
  const list = lists.find(li => li.id == id);
  
  if(!list){
    logger.error(`List with id ${id} isn't found`);
    return res.status(404).send('List not found');
  }
  res.json(list);
});

module.exports = listRouter;