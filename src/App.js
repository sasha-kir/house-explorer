import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import Navigation from './components/navigation/Navigation';
import PublicHomePage from './components/public-home-page/PublicHomePage';
import PlaceholderPage from './components/placeholder-page/PlaceholderPage';
import LogInPage from './components/login-page/LogInPage';
import RegisterPage from './components/register-page/RegisterPage';
import ExplorePage from './components/explore-page/ExplorePage';
import NotFoundPage from './components/404-page/NotFoundPage';


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="body">
        <Router>
          <Navigation loggedIn={loggedIn} />
          
          <Switch>
            <Route exact path="/" component={PublicHomePage} />
            <Route path="/cities" component={PlaceholderPage} />
            <Route path="/about" component={PlaceholderPage} />
            <Route path="/login" component={LogInPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/explore" render={() => (
              loggedIn
                ? (<ExplorePage />)
                : (<Redirect to="/login" />)
              )}
            />
            <Route path="/profile" render={() => (
              loggedIn
                ? (<PlaceholderPage />)
                : (<Redirect to="/login" />)
              )}
            />
            <Route path="/history" render={() => (
              loggedIn
                ? (<PlaceholderPage />)
                : (<Redirect to="/login" />)
              )}
            />
            <Route component={NotFoundPage} />
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
