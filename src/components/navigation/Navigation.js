import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.css';
import logo from '../../images/logo.svg';

class Navigation extends Component {

    handleLogoClick = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <nav>
                <div className="main-nav">
                    <img id="logo" alt="logo" src={logo} 
                         onClick={this.handleLogoClick} />
                    <NavLink to="/cities">
                        cities
                    </NavLink>
                    <NavLink to="/about">
                        about
                    </NavLink>
                    <div className="right-nav">
                        <NavLink to="/register" id="sign-up-btn">
                            sign up
                        </NavLink>
                        <NavLink to="/login" id="login-link">
                            log in
                        </NavLink>
                        <div className="arrow"></div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);