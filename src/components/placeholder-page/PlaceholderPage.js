import React from 'react';
import './PlaceholderPage.css';

import placeholder from '../../images/under-construction.png';

const PlaceholderPage = () => {
    return (
        <div className="placeholder-main-div">
            <p>page under construction</p>
            <div className="image-wrapper">
                <img alt="placeholder" src={placeholder} />
                <span className="image-credit">&copy; &nbsp;
                    <a href="https://icons8.com/ouch/illustration/abstract-location-access" 
                        rel="noopener noreferrer" target="_blank">Icons 8</a>
            </span>
            </div>
        </div>
    );
}

export default PlaceholderPage;