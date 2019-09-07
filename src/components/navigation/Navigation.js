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
                    <a href="/">log in</a>
                    <a id="sign-up" href="/">sign up</a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;