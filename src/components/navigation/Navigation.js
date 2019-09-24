import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.sass';
import logo from '../../images/logo.svg';

class Navigation extends Component {

    handleLogoClick = () => {
        this.props.history.push("/");
    }

    leftContentSwitcher = () => {
        if (this.props.loggedIn) {
            return (
                <NavLink to="/explore" id="explore-link">
                    explore
                </NavLink>
            )
        }
    }

    rightContentSwitcher = () => {
        if (this.props.loggedIn) {
            return (
                <div className="right-nav">
                    <NavLink to="/history">
                        history
                    </NavLink>
                    <NavLink to="/profile">
                        profile
                    </NavLink>
                    <NavLink to="/#" className="login-link"
                             onClick={this.props.handleLogOut}>
                        log out
                    </NavLink>
                    <div className="arrow"></div>
                </div>
            );
        } else {
            return (
                <div className="right-nav">
                    <NavLink to="/register" className="signup-btn">
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
                    {this.leftContentSwitcher()}
                    <NavLink to="/cities" id="cities-link">
                        cities
                    </NavLink>
                    <NavLink to="/about">
                        about
                    </NavLink>
                    {this.rightContentSwitcher()}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);