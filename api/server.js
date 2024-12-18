const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

// Import routes
const routes = require('./index'); // Adjust path as necessary
app.use('/api', routes);

// Start the server and store the instance in the 'server' variable
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${server.address().port}`);
});
