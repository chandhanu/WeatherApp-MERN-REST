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
                <hr></hr>
                <div>
                <h4 align='center'>Saved Checks</h4>
                    
                <WeatherHistoryPanel/>
                </div>
            </section>
        );
    }
}

export default WeatherPanels;