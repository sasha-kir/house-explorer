import React from 'react';
import { Helmet } from "react-helmet-async";

import './PublicHomePage.sass';
import cover from '../../images/cover.png';
import coverSmall from '../../images/cover-small.png';

const PublicHomePage = ({ history }) => {
    
    const handleIntroBtnClick = () => {
        history.push("/explore");
    }
    
    return(
        <div className="public-home-main-div">
            <Helmet>
                <title>House Explorer</title>
            </Helmet>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="intro-wrapper">
                <div className="intro-heading">House <br/>Explorer</div>
                <div className="intro-text" >
                    Delve into the diverse residential architechture of Russian cities.
                    Search by address or explore buildings around your current location.
                    Find out when the house was built, what type of series it belongs to, and more!
                </div>
                <button className="intro-btn" onClick={handleIntroBtnClick}>
                    get started
                </button>
            </div>
            <div className="cover-image-wrapper">
                <picture className="cover-image">
                    <source srcSet={coverSmall} type="image/png" media="(max-width: 650px)" />
                    <source srcSet={cover} type="image/png" />
                    <img alt="abstract location illustration" src={cover} /> 
                </picture>
                <p className="cover-image-credit">&copy; &nbsp;
                    <a href="https://icons8.com/ouch/illustration/abstract-location-access" 
                       rel="noopener noreferrer" target="_blank">Icons 8</a> 
                </p>
            </div>
        </div>
    );
}

export default PublicHomePage;