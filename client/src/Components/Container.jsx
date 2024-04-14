import React, {Component} from "react";
import WeatherForm from "./WeatherForm";
import WeatherPanels from "./WeatherPanels";
import WeatherCityForm from "./WeatherCityForm";

class Container extends Component {
    state = {
        weatherData: ''
    };

    render() {
        return(
            <section className="weather container">
                <h3 className="annotation" align="center">Functional Components with Hooks </h3>
                <WeatherCityForm />
                
                <h3 className="annotation" align="center">Class Components with Redux & MongoDB integration </h3>
                <WeatherForm />
                <WeatherPanels weatherData={this.state.weatherData}/>
                
            </section>
        );
    }
}

export default Container;