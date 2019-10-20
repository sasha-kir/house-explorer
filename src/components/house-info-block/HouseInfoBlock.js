import React from 'react';

import searchHouse from '../../images/search-house.png';
import searchError from '../../images/search-error.png';

import './HouseInfoBlock.sass';

const HouseInfoBlock = ({ infoBlock, startState, addressNotFound }) => {

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
                <div className="house-info-header house-info-start-header">
                    <span className="header-highlight">start exploring</span>
                </div>
                <div className="house-info-start-content">
                    <img 
                        src={searchHouse}
                        alt="magnifying glass over paper with house on it"
                        title="Icon made by IYIKON from pngtree.com"
                    />
                    <p> 
                        Start entering an address and choose from the suggestions 
                        to get the full info about the house. <br/><br/>
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
                        <p>{infoBlock.address}</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["crane"]} 
                            alt="crane" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <div className="key">built in:</div>
                            <div>{infoBlock.yearBuilt}</div>
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["design"]} 
                            alt="paper and ruler" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <div className="key">house type:</div>
                            { 
                                infoBlock.houseTypeLink
                                  ? <a  href={infoBlock.houseTypeLink} 
                                        rel="noopener noreferrer" 
                                        target="_blank"
                                    >
                                        {infoBlock.houseType}
                                    </a>
                                  : <div>{infoBlock.houseType}</div>
                            }
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["skyscraper"]} 
                            alt="two tall houses" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <div className="key">floor count:</div>
                            <div>{infoBlock.floorCount}</div>
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={images["wall"]} 
                            alt="brick wall" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <div className="key">walls:</div>
                            <div>{infoBlock.wallsMaterial}</div>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    const renderErrorBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header house-info-error-header">
                    <span className="header-highlight">error: house not found</span>
                </div>
                <div className="house-info-error-content">
                    <img 
                        src={searchError}
                        alt="exclamation point inside magnifying glass"
                        title="Icon made by syedhassan from pngtree.com"
                    />
                    <p> 
                        Please check the address and try again. <br/><br/>
                        <span className="help-text">
                            If an address is not in the suggestions, 
                            try changing the city by using the menu on the map.
                        </span>
                    </p>
                </div>
            </div>
        ); 
    }

    const contentSwitcher = () => {
        if (startState) {
            return renderStartBlock();
        } else if (addressNotFound) {
            return renderErrorBlock();
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

