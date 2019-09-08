import React, { Component } from 'react';
import './LandingPage.css';

import Navigation from '../navigation/Navigation';
import cover from './cover.png';

class LandingPage extends Component {
    render() {
        return (
            <div className="body">
                <Navigation />
                <div className="cover">
                    <div></div>
                    <div></div>
                    <div className="intro-wrapper">
                        <p className="intro-heading">House<br/>Explorer</p>
                        <p className="intro-text" >
                            Lorem ipsum odor amet, consectetuer adipiscing elit. 
                            Scelerisque mus neque class dolor. Adipiscing placerat tempor.
                        </p>
                        <button className="intro-btn">get started</button>
                    </div>
                    <div className="image-wrapper">
                        <img className="cover-image" alt="houses with a map pin over them" src={cover} />
                        <p className="image-credit">&copy; &nbsp;
                            <a href="https://icons8.com/ouch/illustration/abstract-location-access" 
                               rel="noopener noreferrer" target="_blank">Icons 8</a> 
                        </p>
                    </div>
                </div>
                <footer>
                    created by <i className="fab fa-github"></i>
                    &nbsp;  
                    <a href="http://github.com/sasha-kir" 
                       rel="noopener noreferrer" target="_blank">sasha-kir</a>
                </footer>
            </div>
        );
    }
};

export default LandingPage;
