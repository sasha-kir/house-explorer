import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.sass';
import logo from '../../images/logo.svg';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loggedIn: false,
            userPic: ""
        }
    }

    async componentDidMount() {
        try {
            let token = localStorage.getItem('userToken');
            let response = await fetch(process.env.REACT_APP_SERVER_URL + '/userpic', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                let data = await response.json();
                this.setState({ loggedIn: true, userPic: data.userPic, loading: false });
            } else {
                this.setState({ loggedIn: false, loading: false });
            };
        } catch (TypeError) {
            console.log('server error: could not check token');
            this.setState({ loading: false });
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
                    <img className="user-pic" alt="userpic" src={this.state.userPic} 
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
        if (this.state.loading) return null;
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
                    <button className="hamburger-button">
                        <i class="fas fa-bars"></i>
                    </button>
                    {this.rightContentSwitcher()}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);