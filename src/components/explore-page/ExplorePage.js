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
            receivedCoordData: false,
            mapCoords: [55.751244, 37.618423]
        };
        this.dadataAPIKey = process.env.REACT_APP_DADATA_API_KEY;
    }

    handleSearchInput = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleSearchSubmit = () => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${this.dadataAPIKey}`
            },
            body: JSON.stringify({
                'query': this.state.searchTerm,
                'count': 1,
                'locations': [
                    { "region": "Москва" }
                ],
                'restrict_value': true
            })
        })
          .then(response => response.json())
          .then(data => {
              const suggestion = data.suggestions[0];
              const fullAddress = suggestion.unrestricted_value;
              const { geo_lat, geo_lon } = suggestion.data;
              console.log(fullAddress);
              this.setState({ mapCoords: [geo_lat, geo_lon], receivedCoordData: true });
          })
          .catch(console.log)
    }

    render() {
        return (
            <YMaps>
                <div className="explore-main-div">
                    <Helmet>
                        <title>Explore | House Explorer</title>
                    </Helmet>
                    <div className="explore-content">
                        <SearchBar 
                            handleInput={this.handleSearchInput}
                            handleSubmit={this.handleSearchSubmit}/>
                        <div>
                            House Info
                        </div>
                    </div>
                    <div className="map">
                        <YandexMap 
                            mapCoords={this.state.mapCoords}
                            startState={!this.state.receivedCoordData} />
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