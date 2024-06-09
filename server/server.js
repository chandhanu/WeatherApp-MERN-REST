// Load environment variables from .env file
require('dotenv').config();

// Import Express.js for creating the web server
const express = require('express');

// Import body-parser middleware for parsing request bodies
const bodyParser = require('body-parser');

// Import Mongoose for MongoDB object modeling
const mongoose = require(process.env.MONGO_URL);

// Import path module for working with file and directory paths
const path = require('path');

// Create an instance of an Express application
const app = express();

// Set the port on which the server will listen, defaulting to 5000 if not specified in environment variables
const port = process.env.PORT || 5000;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use body-parser middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Import API routes from a separate module
const apis = require("./api");

// Mount the imported API routes at the /api path
app.use("/api", apis);

// Check if the application is running in a production environment
if (process.env.NODE_ENV === 'production') {
    // Serve any static files in production
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing in production, return all requests to React app
    app.get('*', function(req, res) {
        // Send the index.html file for any request that doesn't match other routes
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DB, {
    // Use the new MongoDB driver's URL string parser
    useNewUrlParser: true,
    // Use the new MongoDB driver's topology engine
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
