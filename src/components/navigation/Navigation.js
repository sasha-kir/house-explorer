import React, { Component } from 'react';
import './Navigation.css';
import logo from './logo.svg';

class Navigation extends Component {
    render() {
        const { currentPage, onRouteChange } = this.props;
        return (
            <nav>
                <div className="main-nav">
                    <img id="logo" alt="logo" src={logo} />
                    <span className={currentPage === "home" ? "active" : ""}
                          onClick={() => onRouteChange("home")}>home</span>
                    <span className={currentPage === "about" ? "active" : ""}
                          onClick={() => onRouteChange("about")}>about</span>
                    <div className="right-nav">
                        <span id="sign-up-btn" href="/">sign up</span>
                        <span id="log-in-link" href="/">log in</span>
                        <div className="arrow"></div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;