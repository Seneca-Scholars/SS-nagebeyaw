const express = require('express');
const app = express();
app.use(express.json()); // This middleware is used to parse JSON bodies.


app.get('/api/items', (req, res) => {
    let houses = [
        {
          "price": "203k",
          "sqrft": "2000",
          "beds": "4",
          "dateListed": '2017-01-03',
          "interestedPpl": 32
        },
        {
          "price": "150k",
          "sqrft": "1800",
          "beds": "3",
          "baths": "2",
          "dateListed": '2018-03-03',
          "interestedPpl": 25

        },
        {
            "price": "120k",
            "sqrft": "1200",
            "beds": "2",
            "baths": "1.5",
            "dateListed": '2018-03-03',
            "interestedPpl": 15
  
          },
          {
            "price": "190k",
            "sqrft": "1900",
            "beds": "3",
            "baths": "3",
            "dateListed":'2018-03-03',
            "interestedPpl": 12
  
          },

        
      ]
   res.send(houses)
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
