import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { YMaps } from "react-yandex-maps";

import { cityList } from './cityList';
import './ExplorePage.sass';

import SearchBar from '../search-bar/SearchBar';
import YandexMap from '../yandex-map/YandexMap';

class ExplorePage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",
            searchSuggestions: [],
            locationOnMap: ["", ""],
            locationCityOrCode: ["", ""],
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
                    const { city, country, region_iso_code } = data.location.data;
                    this.setState({ 
                                    locationOnMap: [city, country],
                                    mapAddress: `${city}, ${country}`,
                                    locationCityOrCode: ["", region_iso_code]
                                });
                } else {
                    this.setState({ 
                                    locationOnMap: ["Москва", "Россия"], 
                                    mapAddress: "Москва, Россия",
                                    locationCityOrCode: ["Moscow", "RU-MOW"]
                                });
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
        const { locationOnMap } = this.state;
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
                                "city": locationOnMap[0],
                                "country": locationOnMap[1]
                            }
                        ],
                        'restrict_value': true
                    })
            })
                .then(response => response.json())
                .then(data => data.suggestions)
                .catch(console.log)
    }

    getAddressSuggestions = async (inputValue) => {
        const dadataResponse = await this.sendDadataRequest(inputValue, 5);
        return dadataResponse.map(elem => elem.value);
    }

    renderSuggestions = async ({ value }) => {
        this.setState({ searchSuggestions: await this.getAddressSuggestions(value) });
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
            this.setState({ 
                            mapCoords: [geo_lat, geo_lon], 
                            receivedCoordData: true, 
                            mapAddress: fullAddress 
                        });
        } else {
            console.log("did not find such an address")
        }
    }

    handleSearchSubmit = () => {
        this.sendDadataRequest(this.state.searchTerm, 1)
            .then(result => this.processLocationResponse(result))
    }

    handleCityChoiceOnMap = (event) => {
        const selectedCity = event.get("target").data._data;
        const { nameRus, country } = cityList.filter(city => city.location === selectedCity.center)[0];
        this.setState({ 
                        mapCoords: selectedCity.center,
                        mapAddress: `${nameRus}, ${country}`,
                        locationCityOrCode: [selectedCity.content, ""],
                        locationOnMap: [nameRus, country]
                    });
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
                            cityList={cityList}
                            locationCityOrCode={this.state.locationCityOrCode}
                            handleCityChoice={this.handleCityChoiceOnMap}
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