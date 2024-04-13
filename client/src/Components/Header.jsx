import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <section className="header">
                <h1>Weather Caster <span role="img" aria-label={"rain"}>☂️</span></h1>
                <span className="annotation">(MERN Full Stack Website Example)</span>
            </section>
        );
    }
}

export default Header;