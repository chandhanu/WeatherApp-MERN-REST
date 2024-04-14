import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Button, Row, Col } from "react-bootstrap";
import '../Stylesheets/WeatherCityForm.scss';

const WeatherCityForm = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [metric, setMetric] = useState('metric'); // Default to Celsius

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric === 'metric' ? 'metric' : 'imperial'}&appid=42e7afe4477beb0e6a173bac36eb79bc`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [city, metric]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const toggleMetric = () => {
        setMetric(prevMetric => prevMetric === 'metric' ? 'imperial' : 'metric');
    };

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

export default WeatherCityForm;
