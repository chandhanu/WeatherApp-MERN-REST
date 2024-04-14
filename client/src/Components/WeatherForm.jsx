import React, {Component} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';

import axios from 'axios';

import {connect} from "react-redux";
import {saveZipCode, saveWeatherData, saveTemperature, updateHistory} from "../actions";

class WeatherForm extends Component {
    // default state values
    state = {
        tempMetric: "imperial",
        zipCodeInput: "08901",
        errorMessage: "" // New state for the error message
    }

    componentDidMount() {
        this.refreshSavedWeather();
    }

    // Refreshes the current weather data for the most recent zip code, if it exists
    refreshSavedWeather = () => {
        if (localStorage.getItem("zipCode")) {
            axios.post("/api/weather", {
                zipCode: localStorage.getItem("zipCode"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
                localStorage.setItem("CurrentWeatherData", JSON.stringify(d.data));
                this.props.saveWeatherData(d.data);
            });
        }
    }

    onChange = (e) => {
        // Clear the error message when a new zip code is entered
        if (e.target.name === "zipCodeInput") {
            this.setState({ errorMessage: "" });
        }

        this.setState({ [e.target.name]: e.target.value });
    }

    saveFormData = (event) => {
        event.preventDefault();
    
        try {
            axios.post("/api/weather", {
                zipCode: this.state.zipCodeInput,
                tempMetric: this.state.tempMetric
            }).then(response => {
                let weatherData = response.data;
    
                this.saveToStore(weatherData);
                this.saveToLocalStorage(weatherData);
                this.saveToMongo(weatherData);
                // Clear the error message after successful fetch
                this.setState({ errorMessage: "" });
            }).catch(error => {
                console.error("Error fetching weather data:", error);
                // Update the error message state
                this.setState({ errorMessage: "Invalid Entry: Please provide a valid 5 digit US code" });
            });
        } catch (error) {
            console.error("Error in saveFormData:", error);
            // Update the error message state
            this.setState({ errorMessage: "Invalid Entry: Please provide a valid 5 digit US code" });
        }
    }

    // Save data from form to local storage
    saveToLocalStorage = (weatherData) => {
        localStorage.setItem("zipCode", this.state.zipCodeInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

    saveToMongo = (event) => {
        try {
            axios.post("/api/weatherMongo", {
                zipCode: this.state.zipCodeInput,
                tempMetric: this.state.tempMetric
            }).then(response => {
                let weatherData = response.data;
                console.log("Weather data saved successfully to MongoDB:", weatherData);

                // do whatever you want with the weather data
            }).catch(error => {
                console.error("Error saving to MongoDB:", error);
                // Handle the error, e.g., show a message to the user
            });
        } catch (error) {
            console.error("Error in saveToMongo:", error);
            // Handle the error, e.g., show a message to the user
        }
    }

    // Saves data to the Redux store
    saveToStore = (weatherData) => {
        this.props.saveTemperature(this.state.tempMetric);
        this.props.saveZipCode(this.state.zipCodeInput);
        this.props.saveWeatherData(weatherData);

        this.props.updateHistory({
            timestamp: (new Date()).toLocaleString(),
            city: weatherData.name,
            zipcode: this.state.zipCodeInput,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
    }

    render() {
        return (
            <Form className="weather-form" onSubmit={this.saveFormData}>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        {/* ToggleButtonGroup for temperature metric selection */}
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center" className="zipCode">
                    <Col>
                        <Form.Control name="zipCodeInput"
                                      type="text"
                                      placeholder="Enter your zip code"
                                      onChange={this.onChange}
                                      className="zipCodeInput"/>
                        {this.state.errorMessage && <div className="error-message">{this.state.errorMessage}</div>}
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <Button className="save-btn" variant="primary" type="submit">
                        <i className="fa-solid fa-search"></i> LookUp
                        </Button>
                    </Col>
                </Row>

            </Form>
        );
    }
}

// Mapping state from the store to props;
const mapStateToProps = (state) => {
    return {
        zipCode: state.zipCode,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// These are the actions we can dispatch and just mapping it to props
const mapDispatchToProps = () => {
    return {
        saveZipCode,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// This connects our mapping the state & dispatch to props to use in WeatherForm
export default connect(mapStateToProps, mapDispatchToProps())(WeatherForm);
