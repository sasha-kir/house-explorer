import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.css';
import logo from '../../images/logo.svg';

class Navigation extends Component {

    handleLogoClick = () => {
        this.props.history.push("/");
    }

    contentSwitcher = () => {
        if (this.props.loggedIn) {
            return (
                <div className="right-nav">
                    <NavLink to="/history">
                        history
                    </NavLink>
                    <NavLink to="/profile">
                        profile
                    </NavLink>
                    <NavLink to="/#" className="login-link">
                        log out
                    </NavLink>
                    <div className="arrow"></div>
                </div>
            );
        } else {
            return (
                <div className="right-nav">
                    <NavLink to="/register" id="sign-up-btn">
                        sign up
                    </NavLink>
                    <NavLink to="/login" className="login-link">
                        log in
                    </NavLink>
                    <div className="arrow"></div>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="main-nav">
                    <img className="logo" alt="logo" src={logo} 
                         onClick={this.handleLogoClick} />
                    <NavLink to="/explore">
                        explore
                    </NavLink>
                    <NavLink to="/cities">
                        cities
                    </NavLink>
                    <NavLink to="/about">
                        about
                    </NavLink>
                    {this.contentSwitcher()}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);