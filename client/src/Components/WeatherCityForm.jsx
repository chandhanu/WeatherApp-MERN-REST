// Import necessary React hooks and components
import React, { useState } from "react";
// Import Axios for making HTTP requests
import axios from 'axios';
// Import UI components from React Bootstrap
import { Form, Button, Row, Col } from "react-bootstrap";
// Import custom styles
import '../Stylesheets/WeatherCityForm.scss';

// Define the WeatherCityForm component
const WeatherCityForm = () => {
    // State for the city name input
    const [city, setCity] = useState('');
    // State for storing fetched weather data
    const [weatherData, setWeatherData] = useState(null);
    // State to indicate if data is currently being fetched
    const [loading, setLoading] = useState(false);
    // State for storing any error messages
    const [error, setError] = useState(null);
    // State for temperature unit (default to Celsius)
    const [metric, setMetric] = useState('metric');

    // Function to fetch weather data
    const fetchData = async () => {
        // Set loading to true
        setLoading(true);
        // Reset any previous error messages
        setError(null);
        try {
            // Make an API request to fetch weather data
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric === 'metric' ? 'metric' : 'imperial'}&appid=42e7afe4477beb0e6a173bac36eb79bc`
            );
            // Update weatherData state with the fetched data
            setWeatherData(response.data);
        } catch (error) {
            // Log the error to the console
            console.error(error);
            // Set an error message
            setError("Failed to fetch weather data. Please provide a valid City Name, Eg: [New Brunswick, CA] or [New York]");
        } finally {
            // Set loading to false after the request is complete
            setLoading(false);
        }
    };

    // Handler for input change
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    // Function to toggle between Celsius and Fahrenheit
    const toggleMetric = () => {
        setMetric(prevMetric => prevMetric === 'metric' ? 'imperial' : 'metric');
    };

    // Return the JSX to render
    return (
        <div className="weather-info">
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group controlId="cityName">
                            <Form.Control type="text" placeholder="Enter city name" value={city} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Button type="submit">Get Weather</Button>
                    </Col>
                </Row>
            </Form>
            {loading && <p>Loading weather data...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <>
                    <h3 className="city-name">{weatherData.name}</h3>
                    <section className="overcast">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="overcast-img" alt="Weather Icon"/>
                        <span className="overcast-description">{weatherData.weather[0].description}</span>
                    </section>
                    <hr/>
                    <section className="current-weather">
                        <span className="humidity">Humidity <i className="fa-solid fa-water"></i>: {weatherData.main.humidity}%</span>
                        <span className="curr-temp">Temp<i className="fa-solid fa-temperature-half"></i>: {weatherData.main.temp}{metric === 'metric' ? '°C' : '°F'}</span>
                        <span className="feels-like">Feels like<i className="fa-regular fa-face-grin-beam-sweat"></i>: {weatherData.main.feels_like}{metric === 'metric' ? '°C' : '°F'}</span>
                    </section>
                    <hr/>
                    <section className="temps">
                        <span className="min-temp">Low<i className="fa-solid fa-temperature-arrow-up"></i>: {weatherData.main.temp_min}{metric === 'metric' ? '°C' : '°F'}</span>
                        <span className="max-temp">High<i className="fa-solid fa-temperature-arrow-down"></i>: {weatherData.main.temp_max}{metric === 'metric' ? '°C' : '°F'}</span>
                    </section>
                    <Button className="save-btn" onClick={toggleMetric}>Switch to {metric === 'metric' ? 'Fahrenheit' : 'Celsius'}</Button>
                </>
            )}
        </div>
    );
};

// Export the component
export default WeatherCityForm;
