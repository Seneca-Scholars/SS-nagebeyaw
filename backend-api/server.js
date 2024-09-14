const express = require('express');
const app = express();
app.use(express.json()); // This middleware is used to parse JSON bodies.


app.get('/api/items', (req, res) => {
    let cars = [
        {
          "color": "purple",
          "type": "minivan",
          "registration": new Date('2017-01-03'),
          "capacity": 7
        },
        {
          "color": "red",
          "type": "station wagon",
          "registration": new Date('2018-03-03'),
          "capacity": 5
        },
        
      ]
   res.send(cars)
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

app.listen(3000, () => console.log('Server running on port 3000'));
