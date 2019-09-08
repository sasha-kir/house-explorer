import React from 'react';
import './AboutPage.css';

import placeholder from '../landing-page/under-construction.png';

const AboutPage = () => {
    return (
        <div className="about-wrapper">
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

export default AboutPage;