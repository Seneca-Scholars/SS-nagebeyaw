
const express = require('express');
const app = express();
app.use(express.json()); // This middleware is used to parse JSON bodies.
//call connect'
app.get('/api/items', (req, res) => {
    res.send.json([ test,test,test,test]);
  });

  app.post('/api/items', (req, res) => {
    const newItem = req.body; // Data sent in the request body.
    res.send(`Item added: ${newItem.name}`);
  });

  app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id; // Access URL parameter.
    res.send(`Item with ID ${itemId} updated`);
  });

  app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    res.send(`Item with ID ${itemId} deleted`);
  });
  