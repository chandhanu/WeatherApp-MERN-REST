import React, {Component} from "react";
import '@fortawesome/fontawesome-free/css/all.css';

import {connect} from "react-redux";

class WeatherInfoPanel extends Component {

    // Differentiates whether user chose to use Celsius or Fahrenheit
    getMetric = () => {
        let metric = localStorage.getItem("tempMetric");
        metric = !!metric ? metric : "";
        return metric.includes("metric") ? "°C" : "°F";
    }

    render() {
        const {weatherData} = this.props;
        let metricSymbol = this.getMetric();

        if (Object.keys(weatherData).length > 0) {
            const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            return (
                <section className="weather-info">
                    <h3 className="city-name">{weatherData.name}</h3>

                    <section className="overcast">
                        <img src={iconUrl} className="overcast-img" alt=""/>
                        <span className="overcast-description">{weatherData.weather[0].description}</span>
                    </section>

                    <hr/>

                    <section className="current-weather">
                        <span className="humidity">Humidity <i className="fa-solid fa-water"></i>: {weatherData.main.humidity}%</span>
                        <span className="curr-temp">Temp<i className="fa-solid fa-temperature-half"></i>: {weatherData.main.temp}{metricSymbol}</span>
                        <span className="feels-like">Feels like<i className="fa-regular fa-face-grin-beam-sweat"></i>: {weatherData.main.feels_like}{metricSymbol}</span>
                    </section>

                    <hr/>

                    <section className="temps">
                        <span className="min-temp">Low<i className="fa-solid fa-temperature-arrow-up"></i>: {weatherData.main.temp_min}{metricSymbol}</span>
                        <span className="max-temp">High<i className="fa-solid fa-temperature-arrow-down"></i>: {weatherData.main.temp_max}{metricSymbol}</span>
                    </section>
                </section>
            );
        }
        return (
            <section align="center">
                WeatherInfo!
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weatherData: state.weather
    }
};

export default connect(mapStateToProps)(WeatherInfoPanel);