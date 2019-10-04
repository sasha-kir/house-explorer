import React, { Component } from 'react';
import { Helmet } from "react-helmet-async";
import { YMaps } from "react-yandex-maps";

import { cityList } from './cityList';
import './ExplorePage.sass';

import SearchBar from '../search-bar/SearchBar';
import HouseInfoBlock from '../house-info-block/HouseInfoBlock';

const YandexMap = React.lazy(() => 
    import ('../yandex-map/YandexMap')
);


class ExplorePage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "",                             // what is entered in input
            savedSearchTerm: "",                        // what user unitially typed, without suggestion
            searchSuggestions: [],                      // suggestions fetched from dadata
            locationInRussian: ["Москва", "Россия"],    // [city, country] in Russian
            locationInEnglish: ["Moscow", "RU-MOW"],    // [city, isoCode] in English
            receivedCoordData: false,                   // if received coordinates from dadata
            mapCoords: [0, 0],                          // coordinates to place pin and map center
            mapAddress: "Москва, Россия"                // full address at pin
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
                                    locationInRussian: [city, country],
                                    mapAddress: `${city}, ${country}`,
                                    locationInEnglish: ["", region_iso_code]
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
        const { locationInRussian } = this.state;
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
                                "city": locationInRussian[0],
                                "country": locationInRussian[1]
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

    handleSearchSubmit = async () => {
        let dadataResponse = await this.sendDadataRequest(this.state.searchTerm, 1);
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

    saveInitialInput = (event) => {
        const { searchSuggestions, searchTerm } = this.state;
        if (searchSuggestions && !searchSuggestions.includes(searchTerm)) {
            this.setState({ savedSearchTerm: event.target.value });
        }
    }

    fillInitialInput = () => {
        const { savedSearchTerm } = this.state;
        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm, savedSearchTerm: "" });
        }
    }

    handleCityChoiceOnMap = (event) => {
        const selectedCity = event.get("target").data._data;
        const { nameRus, country } = cityList.filter(city => city.location === selectedCity.center)[0];
        this.setState({ 
                        mapCoords: selectedCity.center,
                        mapAddress: `${nameRus}, ${country}`,
                        locationInEnglish: [selectedCity.content, ""],
                        locationInRussian: [nameRus, country]
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
                            saveInitialInput={this.saveInitialInput}
                            fillInitialInput={this.fillInitialInput}
                        />
                        <HouseInfoBlock />
                    </div>
                    <React.Suspense fallback={<div></div>}>
                            <YandexMap 
                                mapCoords={this.state.mapCoords}
                                mapAddress={this.state.mapAddress}
                                startState={!this.state.receivedCoordData}
                                cityList={cityList}
                                locationInEnglish={this.state.locationInEnglish}
                                handleCityChoice={this.handleCityChoiceOnMap}
                            />
                    </React.Suspense>
                </div>
            </YMaps>
        );
    }
}

export default ExplorePage;