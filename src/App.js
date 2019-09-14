import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/Navigation';
import HomePage from './components/home-page/HomePage';
import PlaceholderPage from './components/placeholder-page/PlaceholderPage';
import LogInPage from './components/login-page/LogInPage';


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
      case "home":
        return (<HomePage />);
      case "cities":
        return (<PlaceholderPage />);
      case "about":
        return (<PlaceholderPage />);
      case "login":
        return (<LogInPage onRouteChange={this.handleRouteChange} />);
      default:
        return (<HomePage />);
    };
  }

  render() {
    return (
      <div className="body">
        <Navigation currentPage={this.state.route} onRouteChange={this.handleRouteChange} />
        {this.routeSwitcher()}
        {/*<Footer />
        

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
