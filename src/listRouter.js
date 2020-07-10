const listRouter = express.Router();
const express = require('express');
const {lists} = require('./data.js');
const logger = require('./logger.js');

listRouter.get('/list', (req, res) => {
  res.json(lists);
});

listRouter.get('/list/:id', (req, res) => {

  const{id} = req.params;
  const list = lists.find(li => li.id == id);
  
  if(!list){
    logger.error(`List with id ${id} isn't found`);
    return res.status(404).send('List not found');
  }
  res.json(list);
});

module.exports = listRouter;