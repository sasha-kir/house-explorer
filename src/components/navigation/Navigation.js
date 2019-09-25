import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.sass';
import logo from '../../images/logo.svg';

class Navigation extends Component {

    handleLogoClick = () => {
        this.props.history.push(this.props.defaultPath);
    }

    leftContentSwitcher = () => {
        if (this.props.loggedIn) {
            return (
                <NavLink to={this.props.defaultPath + "explore"}>
                    explore
                </NavLink>
            )
        }
    }

    rightContentSwitcher = () => {
        const {loggedIn, defaultPath } = this.props;
        if (loggedIn) {
            return (
                <div className="right-nav">
                    <NavLink to={defaultPath + "history"}>
                        history
                    </NavLink>
                    <NavLink to={defaultPath + "profile"}>
                        profile
                    </NavLink>
                    <NavLink to={defaultPath} className="login-link"
                             onClick={this.props.handleLogOut}>
                        log out
                    </NavLink>
                    <div className="arrow"></div>
                </div>
            );
        } else {
            return (
                <div className="right-nav">
                    <NavLink to={defaultPath + "register"} className="signup-btn">
                        sign up
                    </NavLink>
                    <NavLink to={defaultPath + "login"} className="login-link">
                        log in
                    </NavLink>
                    <div className="arrow"></div>
                </div>
            );
        }
    }

    render() {
        const { defaultPath } = this.props;
        return (
            <nav>
                <div className="main-nav">
                    <img className="logo" alt="logo" src={logo} 
                         onClick={this.handleLogoClick} />
                    {this.leftContentSwitcher()}
                    <NavLink to={defaultPath + "cities"}>
                        cities
                    </NavLink>
                    <NavLink to={defaultPath +"about"}>
                        about
                    </NavLink>
                    {this.rightContentSwitcher()}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);