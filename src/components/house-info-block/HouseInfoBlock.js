import React from 'react';

import './HouseInfoBlock.sass';

const HouseInfoBlock = () => {

    const importAll = (req) => {
        let images = {};
        req.keys().forEach(key => {
            images[key.slice(2, -4)] = req(key);
        });
        return images;
    };
    
    const images = importAll(require.context('../../images/house-info-icons', false, /.*\.svg$/));

    return(
        <div className="house-info-main-div">
            <div className="house-info-wrapper">
                <div className="house-info-header">
                    house info
                </div>
                <div className="house-info-content">
                    <div className="house-info-block">
                        <img alt="house inside map pin" src={images["address"]} />
                        <p>full address here</p>
                    </div>
                    <div className="house-info-block">
                        <img alt="crane" src={images["crane"]} />
                        <p>year built</p>
                    </div>
                    <div className="house-info-block">
                        <img alt="paper and ruler" src={images["design"]} />
                        <p>type of house</p>
                    </div>
                    <div className="house-info-block">
                        <img alt="two tall houses" src={images["skyscraper"]} />
                        <p>numer of floors</p>
                    </div>
                    <div className="house-info-block">
                        <img alt="lightning inside box" src={images["electricity"]} />
                        <p>natural gas or no</p>
                    </div>
                    <div className="house-info-block">
                        <img alt="brick wall" src={images["wall"]} />
                        <p>type of walls</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseInfoBlock;

