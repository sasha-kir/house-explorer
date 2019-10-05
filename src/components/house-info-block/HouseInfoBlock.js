import React from 'react';

import searchHouse from '../../images/search-house.png';

import './HouseInfoBlock.sass';

const HouseInfoBlock = ({ mapAddress, startState }) => {

    const importAll = (req) => {
        let images = {};
        req.keys().forEach(key => {
            images[key.slice(2, -4)] = req(key);
        });
        return images;
    };
    
    const images = importAll(require.context('../../images/house-info-icons', false, /.*\.svg$/));

    const renderStartBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-start-header">
                    <span className="header-highlight">start exploring</span>
                </div>
                <div className="house-info-start-content">
                    <img 
                        src={searchHouse}
                        alt="magnifying glass over paper with house on it"
                        title="Icon made by IYIKON from pngtree.com"
                    />
                    <p> 
                        Start entering an address and choose one from the suggestions. <br/><br/>
                        <span className="help-text">
                            Your location was determined automatically. 
                            You can choose another city by using the menu on the map.
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    const renderHouseBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header">
                    <span className="header-highlight"> about this house</span>
                </div>
                <div className="house-info-house-content">
                    <div className="house-info-block">
                        <img    
                            src={images["address"]} 
                            alt="house inside map pin"
                            title="Icon made by Freepik from www.flaticon.com"
                        />
                        <p>{mapAddress}</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["crane"]} 
                            alt="crane" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p>year built</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["design"]} 
                            alt="paper and ruler" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p>type of house</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["skyscraper"]} 
                            alt="two tall houses" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p>numer of floors</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["electricity"]} 
                            alt="lightning bolt inside box" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p>natural gas or no</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["wall"]} 
                            alt="brick wall" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p>type of walls</p>
                    </div>
                </div>
            </div>
        );
    }
    
    const contentSwitcher = () => {
        if (startState) {
            return renderStartBlock();
        } else {
            return renderHouseBlock();
        }
    }

    return(
        <div className="house-info-main-div">
            {contentSwitcher()}
        </div>
    );
};

export default HouseInfoBlock;

