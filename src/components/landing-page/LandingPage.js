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
                    <div className="introduction">
                        <p className="intro-heading">House Explorer</p>
                        <p className="intro-text" >
                            Lorem ipsum odor amet, consectetuer adipiscing elit. 
                            Scelerisque mus neque class dolor. Adipiscing placerat tempor.
                        </p>
                    </div>
                    <img id="cover-image" alt="houses with a map pin over them" src={cover} />
                </div>
                <footer>
                    created by <i className="fab fa-github"></i>
                    &nbsp;  
                    <a href="http://github.com/sasha-kir">sasha-kir</a>
                </footer>
            </div>
        );
    }
};

export default LandingPage;
