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
                <div className="house-info-header">
                    start exploring
                </div>
                <div className="house-info-start-content">
                    <p> Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Scelerisque mus neque class dolor. Adipiscing placerat tempor.</p>
                    <img 
                        src={searchHouse}
                        alt="magnifying glass over paper with house on it"
                        title="Designed By IYIKON from Pngtree.com"
                    />
                </div>
            </div>
        );
    }

    const renderHouseBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header">
                    about this house
                </div>
                <div className="house-info-content">
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

