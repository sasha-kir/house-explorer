import React from 'react';
import './Navigation.css';
import logo from './logo.svg';

const Navigation = () => {
    return (
        <nav>
            <div className="main-nav">
                <img id="logo" alt="logo" src={logo} />
                <a className="active" href="/">home</a>
                <a href="/">about</a>
                <a href="/">contact</a>
                <div className="right-nav">
                    <a id="sign-up-btn" href="/">sign up</a>
                    <a id="log-in-link" href="/">log in</a>
                    <div className="arrow"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;