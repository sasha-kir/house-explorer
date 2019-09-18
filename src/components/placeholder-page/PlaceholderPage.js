import React from 'react';
import './PlaceholderPage.sass';

import placeholder from '../../images/under-construction.png';

const PlaceholderPage = () => {
    return (
        <div className="placeholder-main-div">
            <p>page under construction</p>
            <div className="placeholder-image-wrapper">
                <img alt="placeholder" src={placeholder} />
                <span className="placeholder-image-credit">&copy; &nbsp;
                    <a href="https://icons8.com/ouch/illustration/marginalia-page-under-construction" 
                        rel="noopener noreferrer" target="_blank">Icons 8</a>
                </span>
            </div>
        </div>
    );
}

export default PlaceholderPage;