import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { YMaps } from "react-yandex-maps";

import './ExplorePage.sass';

import SearchBar from '../search-bar/SearchBar';
import YandexMap from '../yandex-map/YandexMap';

class ExplorePage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            searchSuggestions: [],
            userLocation: ["", ""],
            receivedCoordData: false,
            mapCoords: [0, 0],
            mapAddress: ""
        };
        this.dadataAPIKey = process.env.REACT_APP_DADATA_API_KEY;
        this.yandexAPIKey = process.env.REACT_APP_YANDEX_API_KEY;
    }

    getCityFromIP = (ip) => {
        const url = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`
        fetch(url, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${this.dadataAPIKey}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.location) {
                    const { region, country } = data.location.data;
                    this.setState({ userLocation: [region, country],
                                    mapAddress: `${region}, ${country}`})

                } else {
                    this.setState({ userLocation: ["Москва", "Россия"], 
                                    mapAddress: "Москва, Россия"})
                }
            })
            .catch(console.log)
    }

    componentDidMount() {
        // get IP and starting mapCoords
        let userIP;
        fetch("http://ip-api.com/json")
            .then(result => result.json())
            .then(data => {
                const { lat, lon } = data;
                userIP = data.query;
                this.setState({ mapCoords: [lat, lon] });
            })
            .then(() => this.getCityFromIP(userIP))
            .catch(console.log)
    }

    handleSearchInput = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    clearSearchTerm = () => {
        this.setState({ searchTerm: "" });
    }

    sendDadataRequest = (query, count) => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const { userLocation } = this.state;
        return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Token ${this.dadataAPIKey}`
                    },
                    body: JSON.stringify({
                        'query': query,
                        'count': count,
                        'locations': [
                            { 
                                "region": userLocation[0],
                                "country": userLocation[1]
                            }
                        ],
                        'restrict_value': true
                    })
            })
                .then(response => response.json())
                .then(data => data.suggestions)
                .catch(console.log)
    }

    getAddressSuggestions = (dadataResponse) => {
        if (dadataResponse) {
            const suggestions = dadataResponse.map(elem => elem.value);
            this.setState({ searchSuggestions: suggestions });
        } else {
            this.clearSuggestions();
        }
    }

    renderSuggestions = ({ value }) => {
        this.sendDadataRequest(value, 5)
            .then(result => this.getAddressSuggestions(result));
    }

    clearSuggestions = () => {
        this.setState({ searchSuggestions: [] });
    }

    processLocationResponse = (dadataResponse) => {
        if (dadataResponse[0]) {
            const location = dadataResponse[0];
            const fullAddress = location.unrestricted_value;
            const { geo_lat, geo_lon } = location.data;
            console.log(fullAddress);
            this.setState({ mapCoords: [geo_lat, geo_lon], 
                            receivedCoordData: true, 
                            mapAddress: fullAddress });
        } else {
            console.log("did not find such an address")
        }
    }

    handleSearchSubmit = () => {
        this.sendDadataRequest(this.state.searchTerm, 1)
            .then(result => this.processLocationResponse(result))
    }

    render() {
        return (
            <YMaps query={{ apikey: this.yandexAPIKey, lang: 'en_RU' }}>
                <div className="explore-main-div">
                    <Helmet>
                        <title>Explore | House Explorer</title>
                    </Helmet>
                    <div className="explore-content">
                        <SearchBar 
                            handleInput={this.handleSearchInput}
                            handleSubmit={this.handleSearchSubmit}
                            searchTerm={this.state.searchTerm}
                            clearSearchTerm={this.clearSearchTerm}
                            searchSuggestions={this.state.searchSuggestions}
                            renderSuggestions={this.renderSuggestions}
                            clearSuggestions={this.clearSuggestions}
                        />
                        <div>
                            House Info
                        </div>
                    </div>
                    <div className="map">
                        <YandexMap 
                            mapCoords={this.state.mapCoords}
                            mapAddress={this.state.mapAddress}
                            startState={!this.state.receivedCoordData} 
                        />
                    </div>
                </div>
            </YMaps>
        );
    }
}

/*
    <HouseInfoBlock />
    <PhotoBlock />
*/

export default ExplorePage;