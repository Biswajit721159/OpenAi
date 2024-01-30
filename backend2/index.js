// Import the Express.js module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route to handle GET requests to the root URL '/'
app.get('/', (req, res) => {
    // Send a response with the 'Hello, World!' message
    res.send('Hello, World!');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
