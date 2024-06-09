// Import Express.js to create a router for handling API endpoints
const express = require('express');
const router = express.Router();

// Import the Weather class from a local file to interact with weather data
const Weather = require("./weather");

// Define a GET endpoint for fetching weather data statically
// Use case: This endpoint is useful for testing or when you want to fetch weather data for a predefined location
router.get("/weather", async (req, res) => {
    // Create a new instance of the Weather class
    let weather = new Weather();

    // Call the getWeatherData method with a hardcoded zip code and temperature metric
    // This is for demonstration purposes; in a real application, you might want to make this dynamic
    let weatherData = await weather.getWeatherData(98052, "us");

    // Set the response header to indicate the content type is JSON
    res.header("Content-Type",'application/json');
    // Send the weather data back to the client as a JSON string
    // The JSON.stringify method is used with arguments to format the JSON output
    res.send(JSON.stringify(weatherData, null, 4));
});

// Define a POST endpoint for dynamically fetching weather data based on request body
// Use case: This endpoint allows users to input their zip code and temperature metric to get weather data
router.post("/weather", async (req, res) => {
    try {
        // Extract zipCode and tempMetric from the request body
        const {zipCode, tempMetric} = req.body;
        // Create a new instance of the Weather class
        let weather = new Weather();

        // Call the getWeatherData method with the user-provided zip code and temperature metric
        let weatherData = await weather.getWeatherData(zipCode, tempMetric);

        // Set the response header to indicate the content type is JSON
        res.header("Content-Type",'application/json');
        // Send the weather data back to the client as a JSON string
        res.send(JSON.stringify(weatherData, null, 4));
    } catch (error) {
        // Log the error and send a 500 status code with an error message
        console.error("Error in /weather POST:", error);
        res.status(500).send({ error: "An error occurred while fetching weather data." });
    }
});

// Define a POST endpoint for fetching weather data, saving it to MongoDB, and then returning the data
// Use case: This endpoint is useful for caching weather data for quicker access in the future
router.post("/weatherMongo", async(req, res) => {
    try {
        // Extract zipCode and tempMetric from the request body
        const {zipCode, tempMetric} = req.body;
        // Create a new instance of the Weather class
        let weather = new Weather();
        // Fetch weather data based on the provided zip code and temperature metric
        let weatherData = await weather.getWeatherData(zipCode, tempMetric);

        // Save the fetched weather data to MongoDB
        await weather.saveWeatherDataToMongo(zipCode, weatherData);
        // Set the response header to indicate the content type is JSON
        res.header("Content-Type",'application/json');
        // Send the weather data back to the client as a JSON string
        res.send(JSON.stringify(weatherData, null, 4));
    } catch (error) {
        // Log the error and send a 500 status code with an error message
        console.error("Error in /weatherMongo POST:", error);
        res.status(500).send({ error: "An error occurred while saving weather data to MongoDB." });
    }
})

// Define a GET endpoint for fetching weather data saved in MongoDB
// Use case: This endpoint is useful for retrieving cached weather data without making an external API call
router.get("/weatherMongo", async(req, res) => {
    // Extract zipCode from the request query parameters
    const {zipCode} = req.query;
    // Create a new instance of the Weather class
    let weather = new Weather();

    // Fetch weather data from MongoDB based on the provided zip code
    let weatherData = await weather.getWeatherDataFromMongo(zipCode);
    // Set the response header to indicate the content type is JSON
    res.header("Content-Type",'application/json');
    // Send the weather data back to the client as a JSON string
    res.send(JSON.stringify(weatherData, null, 4));
})

// Export the router to be used in the main application
module.exports = router;
