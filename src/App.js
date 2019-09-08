import React, { Component } from 'react';
import './App.css';

import LandingPage from './components/landing-page/LandingPage'
import LogInPage from './components/login-page/LogInPage';
import Footer from './components/footer/Footer';

class App extends Component {
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
      case "login": {
        return (<LogInPage onRouteChange={this.handleRouteChange} />);
      }
      default: {
        return (<LandingPage onRouteChange={this.handleRouteChange} />);
      }
    };
  }

  render() {
    return (
      <div className="App">
        {this.routeSwitcher()}
        <Footer />
        {/*

        <SearchBar />
        <Map />
        <HouseInfoBlock />
        <PhotoBlock />

        <History />
        */}
      </div>
    );
  }
}

export default App;
