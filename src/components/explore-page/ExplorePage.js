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
            mapCoords: [55.753215, 37.622504],          // coordinates to place pin and map center
            mapPinAddress: "Москва, Россия",            // full address at pin
            infoBlock: {}                               // house info block data
        };
        this.yandexAPIKey = process.env.REACT_APP_YANDEX_API_KEY;
    }

    async componentDidMount() {
        // get user ip and coordinates
        try {
            let response = await fetch("http://localhost:5000/user_location");
            let data = await response.json();
            if (response.status === 200) {
                const { lat, lon, city, country, isoCode } = data;
                this.setState({ 
                    mapCoords: [lat, lon],
                    locationInRussian: [city, country],
                    mapPinAddress: `${city}, ${country}`,
                    locationInEnglish: ["", isoCode]
                });
            } else {
                // stay with default (Moscow)
                console.log('dadata could not determine user location');
            }
        } catch {
            // stay with default (Moscow)
            console.log('could not fetch user location from server');
        }
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

    requestSuggestions = async (query, count) => {
        const { locationInRussian } = this.state;
        const [ city, country ] = locationInRussian;
        try {
            let response = await fetch('http://localhost:5000/suggestions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query,
                    count,
                    city,
                    country
                })
            });
            let data = await response.json();
            
            return response.status === 200 ? data : [];
        } catch {
            console.log('could not fetch suggestions from server');
        }
    }

    renderSuggestions = async ({ value }) => {
        if (this.state.searchTerm !== this.state.inputValue) {
            value = this.state.searchTerm;
        };
        const suggestions = await this.requestSuggestions(value, 5);
        this.setState({ searchSuggestions: suggestions.map(elem => elem.address) });
    }

    clearSuggestions = () => {
        this.setState({ searchSuggestions: [] });
    }

    requestHouseInfo = async (query) => {
        const { locationInRussian } = this.state;
        const [ city, country ] = locationInRussian;
        try {
            let response = await fetch('http://localhost:5000/house_info', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query,
                    city,
                    country
                })
            });
            let data = await response.json();
            return response.status === 200 ? data : false;
        } catch {
            console.log('could not fetch house info from server');
        }
    }

    handleSearchSubmit = async () => {
        let house_info = await this.requestHouseInfo(this.state.searchTerm);
        if (this.state.startState) this.setState({ startState: false });
        if (house_info) {
            let { lat, lon, fiasLevel, fullAddress, infoBlock } = house_info;
            fiasLevel = Number(fiasLevel);

            if (fiasLevel < 8) {
                if (fiasLevel === 7) this.setState({ 
                    mapCoords: [lat, lon],
                    mapPinAddress: fullAddress
                 });
                this.setState({ addressNotFound: true });
            } else {
                this.setState({ 
                    mapCoords: [lat, lon],
                    addressNotFound: false,
                    mapPinAddress: fullAddress,
                    infoBlock,
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
                            infoBlock={this.state.infoBlock}
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