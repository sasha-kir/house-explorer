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

    getUserLocation = async (ymaps) => {
        const geoLocation = await ymaps.geolocation.get(
            { 
                provider: "yandex", 
                mapStateAutoApply: true 
            }
        );
        const coordinates = geoLocation.geoObjects.position;
        const result = await ymaps.geocode(coordinates);
        const geoObjectEnglish = result.geoObjects.get(0);
        const cityInEnglish = geoObjectEnglish.getLocalities();
        const geoObjectRussian = await this.reverseGeocodeHandler(coordinates, 'locality');
        if (geoObjectRussian) {
            const { name, description } = geoObjectRussian;
            this.setState({ 
                mapCoords: coordinates,
                locationInRussian: [name, description],
                mapPinAddress: `${name}, ${description}`,
                locationInEnglish: [cityInEnglish, ""]
            });
        } else {
            // stay with default (Moscow)
            console.log('could not determine user location');
        }
    };

    reverseGeocodeHandler = async (coords, kind) => {
        let geoUrl = new URL("https://geocode-maps.yandex.ru/1.x");
        let params = {
            geocode: `${coords[1]}, ${coords[0]}`,
            kind: kind,
            format: "json",
            apikey: this.yandexAPIKey,
            results: 1
        };
        Object.keys(params).forEach(key => geoUrl.searchParams.append(key, params[key]))
        let geocodeResult = await fetch(geoUrl);
        let data = await geocodeResult.json();
        try {
            const location = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            return location;
        } catch (TypeError) {
            return null;
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
            let response = await fetch(process.env.REACT_APP_SERVER_URL + '/suggestions', {
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
            return [];
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
            let response = await fetch(process.env.REACT_APP_SERVER_URL + '/house_info', {
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
            return false;
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
                savedInput: "",
            });
        }
    }

    handleCityChoiceOnMap = (event) => {
        const selectedCity = event.get("target").data._data;
        const { nameRus, country, isoCode } = cityList.filter(city => {
            return city.location === selectedCity.center;
        })[0];
        this.setState({ 
            mapCoords: selectedCity.center,
            mapPinAddress: `${nameRus}, ${country}`,
            locationInEnglish: [selectedCity.content, isoCode],
            locationInRussian: [nameRus, country],
        });
    }

    render() {
        return (
            <YMaps  query={{ apikey: this.yandexAPIKey, lang: 'en_RU' }}>
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
                            initialInput={this.state.savedInput}
                            fillInitialInput={this.fillInitialInput}
                        />
                        <HouseInfoBlock 
                            infoBlock={this.state.infoBlock}
                            mapCoords={this.state.mapCoords}
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
                                getUserLocation={this.getUserLocation}
                                reverseGeocodeHandler={this.reverseGeocodeHandler}
                            />
                    </React.Suspense>
                </div>
            </YMaps>
        );
    }
}

export default ExplorePage;