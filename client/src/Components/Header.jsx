import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <section className="header">
                <h1>WeatherCaster <span role="img" aria-label={"umbrella"}>☂️</span></h1>
                <span className="annotation">(chandhanu.m.k@gmail.com | 7323220885)</span>
            </section>
        );
    }
}

export default Header;