import React, { Component } from 'react';
import './App.css';

import LandingPage from './components/landing-page/LandingPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
        {/* 
        <LandingBody />

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
