import React from 'react';
import { Helmet } from "react-helmet";
import './ExplorePage.sass';


const ExplorePage = () => {
    return (
        <div className="explore-main-div">
            <Helmet>
                <title>Explore | House Explorer</title>
            </Helmet>
            content here
        </div>
    );
}

/*
    <SearchBar />
    <Map />
    <HouseInfoBlock />
    <PhotoBlock />
*/

export default ExplorePage;