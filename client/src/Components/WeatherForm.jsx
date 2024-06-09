// Import React and Component from the React library
import React, {Component} from "react";

// Import Form, Button, Row, and Col components from react-bootstrap for UI elements
import {Form, Button, Row, Col} from "react-bootstrap";

// Import FontAwesome icons for use in the UI
import '@fortawesome/fontawesome-free/css/all.css';

// Import axios for making HTTP requests
import axios from 'axios';

// Import connect from react-redux to connect the component to the Redux store
import {connect} from "react-redux";

// Import action creators from the actions file
import {saveZipCode, saveWeatherData, saveTemperature, updateHistory} from "../actions";

// Define a class component named WeatherForm
class WeatherForm extends Component {
    // Initialize state with default values for temperature metric, zip code input, and error message
    state = {
        tempMetric: "imperial", // Default temperature metric is imperial
        zipCodeInput: "08901", // Default zip code input
        errorMessage: "" // Initial error message is empty
    }

    // Lifecycle method that runs after the component mounts
    componentDidMount() {
        // Call the method to refresh saved weather data
        this.refreshSavedWeather();
    }

    // Method to refresh the current weather data for the most recent zip code, if it exists
    refreshSavedWeather = () => {
        // Check if there's a zip code saved in local storage
        if (localStorage.getItem("zipCode")) {
            // Make a POST request to fetch weather data
            axios.post("/api/weather", {
                zipCode: localStorage.getItem("zipCode"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
                // Save the fetched data to local storage
                localStorage.setItem("CurrentWeatherData", JSON.stringify(d.data));
                // Dispatch the fetched data to the Redux store
                this.props.saveWeatherData(d.data);
            });
        }
    }

    // Event handler for input changes
    onChange = (e) => {
        // If the input name is zipCodeInput, clear the error message
        if (e.target.name === "zipCodeInput") {
            this.setState({ errorMessage: "" });
        }

        // Update the state with the new input value
        this.setState({ [e.target.name]: e.target.value });
    }

    // Method to save form data
    saveFormData = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        try {
            // Make a POST request to fetch weather data
            axios.post("/api/weather", {
                zipCode: this.state.zipCodeInput,
                tempMetric: this.state.tempMetric
            }).then(response => {
                // Save the fetched data to various locations
                let weatherData = response.data;
                this.saveToStore(weatherData);
                this.saveToLocalStorage(weatherData);
                this.saveToMongo(weatherData);
                // Clear the error message after successful fetch
                this.setState({ errorMessage: "" });
            }).catch(error => {
                // Log the error and update the error message state
                console.error("Error fetching weather data:", error);
                this.setState({ errorMessage: "Invalid Entry: Please provide a valid 5 digit US code" });
            });
        } catch (error) {
            // Log the error and update the error message state
            console.error("Error in saveFormData:", error);
            this.setState({ errorMessage: "Invalid Entry: Please provide a valid 5 digit US code" });
        }
    }

    // Method to save data from form to local storage
    saveToLocalStorage = (weatherData) => {
        // Save various pieces of data to local storage
        localStorage.setItem("zipCode", this.state.zipCodeInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

    // Method to save data to MongoDB
    saveToMongo = (event) => {
        try {
            // Make a POST request to save weather data to MongoDB
            axios.post("/api/weatherMongo", {
                zipCode: this.state.zipCodeInput,
                tempMetric: this.state.tempMetric
            }).then(response => {
                // Log the success message
                console.log("Weather data saved successfully to MongoDB:", response.data);
            }).catch(error => {
                // Log the error
                console.error("Error saving to MongoDB:", error);
            });
        } catch (error) {
            // Log the error
            console.error("Error in saveToMongo:", error);
        }
    }

    // Method to save data to the Redux store
    saveToStore = (weatherData) => {
        // Dispatch various pieces of data to the Redux store
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

    // Render method to display the form
    render() {
        return (
            <Form className="weather-form" onSubmit={this.saveFormData}>
                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        {/* Placeholder for temperature metric selection */}
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="center" className="zipCode">
                    <Col>
                        <Form.Control name="zipCodeInput"
                                      type="text"
                                      placeholder="Enter your zip code"
                                      onChange={this.onChange}
                                      className="zipCodeInput"/>
                        {/* Display error message if there is one */}
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

// Map state from the Redux store to props
const mapStateToProps = (state) => {
    return {
        zipCode: state.zipCode,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// Map dispatch to props to allow dispatching actions
const mapDispatchToProps = () => {
    return {
        saveZipCode,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps())(WeatherForm);
