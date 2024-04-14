import React, {Component} from "react";
import WeatherInfoPanel from "./WeatherInfoPanel";
import WeatherHistoryPanel from "./WeatherHistoryPanel";

class WeatherPanels extends Component {
    render() {
        return (
            <section className="weather-panels">
                <div>
                
                <WeatherInfoPanel/>

                </div>
                <div>
                <p>History Local Store</p>
                    
                <WeatherHistoryPanel/>
                </div>
            </section>
        );
    }
}

export default WeatherPanels;