import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import './ExplorePage.sass';

import SearchBar from '../search-bar/SearchBar';

class ExplorePage extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: ""
        }
    }

    render() {
        return (
            <div className="explore-main-div">
                <Helmet>
                    <title>Explore | House Explorer</title>
                </Helmet>
                <SearchBar />
                content here
            </div>
        );
    }
}

/*
    <Map />
    <HouseInfoBlock />
    <PhotoBlock />
*/

export default ExplorePage;