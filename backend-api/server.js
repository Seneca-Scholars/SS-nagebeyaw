const express = require('express');
const app = express();
app.use(express.json()); // This middleware is used to parse JSON bodies.

app.listen(3000, () => console.log('Server running on port 3000'));