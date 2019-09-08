import React, { Component } from 'react';
import './LandingPage.css';

import Navigation from '../navigation/Navigation';
import HomePage from '../home-page/HomePage';
import AboutPage from '../about-page/AboutPage';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: "home"
        };
    }

    handleRouteChange = (nextLocation) => {
        const landingLocations = ["home", "about"];
        if (landingLocations.includes(nextLocation)) {
            this.setState({ route: nextLocation });
        } else {
            this.props.onRouteChange(nextLocation);
        }
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
            </div>
        );
    }
};

export default LandingPage;
