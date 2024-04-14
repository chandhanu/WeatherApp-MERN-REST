import React, {Component} from "react";
import {Card, ListGroup} from "react-bootstrap";

import {connect} from "react-redux";

class WeatherHistoryPanel extends Component {

    createHistoryList = () => {
        let historyComponents = [];
        let historyList = this.props.history;

        // Listing history of zip code submissions in "most recent" order
        for (let i = historyList.length - 1; i >= 0; i--) {
            let infoCard = this.getInfoListItem(historyList[i]);
            historyComponents.push(infoCard);
        }

        return (
            <Card>
                <ListGroup variant="flush">
                    {historyComponents}
                </ListGroup>
            </Card>
        );
    }

    getInfoListItem = (info) => {
        return (
            <ListGroup.Item key={info.timestamp}><b>[TimeStamp: </b>{info.timestamp} ]-
                [<b>City:</b>{info.city}, <b>Zip:</b> {info.zipcode}]:[<b>Temp: </b>{info.temperature}, <b>Weather:</b> {info.description}]</ListGroup.Item>
        );
    }

    render() {
        return (
            <section className="weather-history-panel" align="center">
                {!!this.props.history.length ? this.createHistoryList() : "No History!"}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

export default connect(mapStateToProps)(WeatherHistoryPanel);