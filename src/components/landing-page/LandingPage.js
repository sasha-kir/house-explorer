import React, { Component } from 'react';
import './LandingPage.css';

import Navigation from '../navigation/Navigation';
import HomePage from '../home-page/HomePage';
import Footer from '../footer/Footer';
import AboutPage from '../about-page/AboutPage';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            route: "home"
        };
    }

    handleRouteChange = (nextLocation) => {
        this.setState({ route: nextLocation });
    }

    routeSwitcher = () => {
        switch(this.state.route) {
            case "about": {
                return (<AboutPage />);
            }
            default: {
                return (<HomePage />);
            }
        }
    }

    render() {
        return (
            <div className="body">
                <Navigation currentPage={this.state.route} onRouteChange={this.handleRouteChange} />
                {this.routeSwitcher()}
                <Footer />
            </div>
        );
    }
};

export default LandingPage;
