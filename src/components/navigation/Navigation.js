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
            userPic: "",
            isMobile: window.innerWidth <= 950,
            isHamburgerOpen: false
        }
        this.sideMenu = React.createRef();
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
        window.addEventListener('resize', this.updateHamburger);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHamburger);
    }

    handleLogoClick = () => {
        this.props.history.push("/");
    }

    handleUserpicClick = () => {
        this.props.history.push("/profile");
    }

    contentSwitcher = () => {
        let leftLinks = this.leftContentSwitcher();
        let rightLinks = this.rightContentSwitcher();
        if (!this.state.isMobile) {
            let rightNav = (
                <div className="right-nav">
                    {rightLinks}
                    <div className="arrow"></div>
                </div>
            );
            return [leftLinks, rightNav];
        } else {
            let hamburgerButton = (
                <button className="hamburger-button" onClick={this.toggleHamburger}>
                    {this.state.isHamburgerOpen
                        ? <i className="fas fa-times"></i>
                        : <i className="fas fa-bars"></i>
                    }
                </button>
            );
            let hamburgerMenu = (
                <div className="hamburger-menu">
                    <ul ref={this.sideMenu} className={`side-menu ${this.state.isHamburgerOpen ? "visible" : ""}`}>
                        {leftLinks.map(link => <li>{link}</li>)}
                        <hr />
                        {!this.state.loggedIn
                            ?   [
                                    <li>
                                        {rightLinks[1]}
                                        &nbsp; &nbsp; &nbsp; 
                                        {rightLinks[0]}
                                    </li>,
                                ]
                            :  rightLinks.map(link => <li>{link}</li>)
                        }
                    </ul>
                </div>
            );
            return [hamburgerButton, hamburgerMenu];
        }
    }

    leftContentSwitcher = () => {
        let navType = this.state.isMobile ? "side" : "left";
        let leftLinks = [
            <NavLink className={navType + "-nav-item"} to="/cities" id="cities-link">
                cities
            </NavLink>,
            <NavLink className={navType + "-nav-item"} to="/about">
                about
            </NavLink>
        ];
        if (this.state.loggedIn) {
            leftLinks.unshift(
                <NavLink className={navType + "-nav-item"} to="/explore" id="explore-link">
                    explore
                </NavLink>
            );
        };
        return leftLinks;
    }

    rightContentSwitcher = () => {
        if (this.state.loggedIn) {
            let historyLink =  (
                <NavLink className={this.state.isMobile ? "side-nav-item" : ""} to="/history">
                    history
                </NavLink>
            );
            let profileLink = <NavLink className="side-nav-item" to="/profile">profile</NavLink>;
            let logoutLink = (
                <NavLink to="/#" className={`${this.state.isMobile ? "side-nav-item" : ""} login-link`}
                        onClick={this.props.handleLogOut}
                >
                    log out
                </NavLink>)
            ;
            if (!this.state.isMobile) {
                return [
                    historyLink,
                    <img className="user-pic" alt="userpic" src={this.state.userPic} 
                             onClick={this.handleUserpicClick}
                    />,
                    logoutLink
                ];
            } else {
                return [historyLink, profileLink, logoutLink];
            }
        } else {
            return [
                <NavLink to="/register" className={`${this.state.isMobile ? "side-nav-item" : ""} signup-btn`}>
                    sign up
                </NavLink>,
                <NavLink to="/login" className={`${this.state.isMobile ? "side-nav-item" : ""} login-link`}>
                    log in
                </NavLink>
            ];
        }
    }

    toggleHamburger = () => {
        if (!this.state.isHamburgerOpen) {
            this.setState({ isHamburgerOpen: true });
            this.sideMenu.current.style.right = (window.innerWidth - 300) * (-1) + "px";
        } else {
            this.setState({ isHamburgerOpen: false });
        }
    }

    updateHamburger = () => {
        let width = window.innerWidth;
        width <= 950
            ? this.setState({ isMobile: true })
            : this.setState({ isMobile: false });
        if (this.state.isHamburgerOpen) {
            let menu = this.sideMenu.current;
            width > 550
                ? menu.style.right = (width - 300) * (-1) + "px"
                : menu.style.right = 0;
        }
    }

    render() {
        if (this.state.loading) return null;
        return (
            <nav className="main-nav-bar">
                <div className="main-nav">
                    <img className="logo" alt="logo" src={logo} 
                         onClick={this.handleLogoClick} />
                    {this.contentSwitcher()}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);