import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import Navigation from './components/navigation/Navigation';
import HomePage from './components/home-page/HomePage';
import PlaceholderPage from './components/placeholder-page/PlaceholderPage';
import LogInPage from './components/login-page/LogInPage';


class App extends Component {

  render() {
    return (
      <div className="body">
        <Router>
          <Navigation />
          
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/cities" component={PlaceholderPage} />
            <Route path="/about" component={PlaceholderPage} />
            <Route path="/login" component={LogInPage} />
          </Switch>
        </Router>
        {/*
        <Footer />
        

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
