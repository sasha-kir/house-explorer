import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation /> 
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
