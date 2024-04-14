import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

class Header extends Component {
    render() {
        return (
            <section className="header">
                <h1>WeatherCaster <i className="fa-solid fa-cloud"></i></h1>
                <a href="https://chandhanu.com" className="portfolio-link">
                    <i className="fas fa-user"></i> Chandhanu Mohan Kalamani
                </a>
                <a href="https://github.com/chandhanu/WeatherApp-MERN-REST/tree/main" className="github-link">
                    <i className="fab fa-github"></i> Github
                </a>
            </section>
        );
    }
}

export default Header;
