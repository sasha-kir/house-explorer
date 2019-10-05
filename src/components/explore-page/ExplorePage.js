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
            inputValue: "",                             // input contents
            searchTerm: "",                             // what is searched on submit
            savedInput: "",                             // what user unitially typed, without suggestion
            searchSuggestions: [],                      // suggestions fetched from dadata
            locationInRussian: ["Москва", "Россия"],    // [city, country] in Russian
            locationInEnglish: ["Moscow", "RU-MOW"],    // [city, isoCode] in English
            startState: true,                           // display instructions or no
            addressNotFound: false,                     // if address was not found by dadata
            mapCoords: [0, 0],                          // coordinates to place pin and map center
            mapPinAddress: "Москва, Россия",            // full address at pin
            infoBlockAddress: ""                        // address in info block
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
                                    mapPinAddress: `${city}, ${country}`,
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

    handleSearchInput = (inputValue, translit = "") => {
        if (translit) {
            this.setState({ searchTerm: translit });
        } else {
            this.setState({ searchTerm: inputValue });
        };

        this.setState({ inputValue: inputValue });
    }

    clearSearchTerm = () => {
        this.setState({ searchTerm: "", inputValue: "" });
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
        if (this.state.searchTerm !== this.state.inputValue) {
            value = this.state.searchTerm;
        };
        this.setState({ searchSuggestions: await this.getAddressSuggestions(value) });
    }

    clearSuggestions = () => {
        this.setState({ searchSuggestions: [] });
    }

    handleSearchSubmit = async () => {
        let dadataResponse = await this.sendDadataRequest(this.state.searchTerm, 1);
        if (this.state.startState) this.setState({ startState: false });
        if (dadataResponse[0]) {
            const location = dadataResponse[0];
            const { geo_lat, geo_lon } = location.data;
            const fiasLevel = +location.data.fias_level;
            if (fiasLevel < 8) {
                if (fiasLevel === 7) this.setState({ mapCoords: [geo_lat, geo_lon] });
                this.setState({ addressNotFound: true });
            } else {
                this.setState({ 
                    mapCoords: [geo_lat, geo_lon],
                    addressNotFound: false,
                    mapPinAddress: location.unrestricted_value,
                    infoBlockAddress: `${location.data.city}, ${location.value}`
                });
            };
        } else {
            this.setState({ addressNotFound: true });
        }
    }

    saveInitialInput = (event) => {
        const { searchSuggestions, inputValue } = this.state;
        if (searchSuggestions && !searchSuggestions.includes(inputValue)) {
            this.setState({ savedInput: event.target.value });
        }
    }

    fillInitialInput = () => {
        const { savedInput } = this.state;
        if (savedInput) {
            this.setState({ 
                            searchTerm: savedInput, 
                            inputValue: savedInput,
                            savedInput: "" 
            });
        }
    }

    handleCityChoiceOnMap = (event) => {
        const selectedCity = event.get("target").data._data;
        const { nameRus, country } = cityList.filter(city => city.location === selectedCity.center)[0];
        this.setState({ 
                        mapCoords: selectedCity.center,
                        mapPinAddress: `${nameRus}, ${country}`,
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
                            inputValue={this.state.inputValue}
                            clearInput={this.clearSearchTerm}
                            searchSuggestions={this.state.searchSuggestions}
                            renderSuggestions={this.renderSuggestions}
                            clearSuggestions={this.clearSuggestions}
                            saveInitialInput={this.saveInitialInput}
                            fillInitialInput={this.fillInitialInput}
                        />
                        <HouseInfoBlock 
                            address={this.state.infoBlockAddress}
                            startState={this.state.startState}
                            addressNotFound={this.state.addressNotFound}
                        />
                    </div>
                    <React.Suspense fallback={<div></div>}>
                            <YandexMap 
                                mapCoords={this.state.mapCoords}
                                mapAddress={this.state.mapPinAddress}
                                startState={this.state.startState}
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