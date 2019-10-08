import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.sass';
import logo from '../../images/logo.svg';
import userPic from '../../images/user-placeholder.png';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    async componentDidMount() {
        try {
            console.log("checking token...")
            let token = localStorage.getItem('userToken');
            let response = await fetch('http://localhost:5000/check_token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            };
        } catch (TypeError) {
            console.log('server error: could not check token');
        }
    }

    handleLogoClick = () => {
        this.props.history.push("/");
    }

    handleUserpicClick = () => {
        this.props.history.push("/profile");
    }

    leftContentSwitcher = () => {
        if (this.state.loggedIn) {
            return (
                <NavLink to="/explore" id="explore-link">
                    explore
                </NavLink>
            )
        }
    }

    rightContentSwitcher = () => {
        if (this.state.loggedIn) {
            return (
                <div className="right-nav">
                    <NavLink to="/history">
                        history
                    </NavLink>
                    <img className="user-pic" alt="userpic" src={userPic} 
                            onClick={this.handleUserpicClick}
                    />
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