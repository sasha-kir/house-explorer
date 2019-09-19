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
            searchTerm: ""
        }
    }

    handleSearchInput = (event) => {
        this.setState({ searchTerm: event.target.value });
        console.log(event.target.value);
    }

    render() {
        return (
            <YMaps>
                <div className="explore-main-div">
                    <Helmet>
                        <title>Explore | House Explorer</title>
                    </Helmet>
                    <div className="explore-content">
                        <SearchBar handleSearchInput={this.handleSearchInput} />
                        <div>
                            House Info
                        </div>
                    </div>
                    <div className="map">
                        <YandexMap />
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