import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './App.sass';

import withAuth from './components/with-auth/withAuth';

import Navigation from './components/navigation/Navigation';
import PublicHomePage from './components/public-home-page/PublicHomePage';
import PlaceholderPage from './components/placeholder-page/PlaceholderPage';
import LogInPage from './components/login-page/LogInPage';
import RegisterPage from './components/register-page/RegisterPage';
import ExplorePage from './components/explore-page/ExplorePage';
import ProfilePage from './components/profile-page/ProfilePage';
import HistoryPage from './components/history-page/HistoryPage';
import NotFoundPage from './components/404-page/NotFoundPage';


class App extends Component {

  constructor() {
    super();
    this.state = {
      navKey: Math.floor((Math.random() * 1000) + 1)
    }
  }

  handleLogOut = () => {
    localStorage.setItem("userToken", "");
    this.setState({ navKey: Math.floor((Math.random() * 1000) + 1) });
  }

  handleLogIn = (data) => {
    localStorage.setItem("userToken", data.token);
    this.setState({ navKey: Math.floor((Math.random() * 1000) + 1) });
  }

  render() {
    return (
      <HelmetProvider>
        <div className="body">
          <Router basename="/house-explorer">
            <Navigation key={this.state.navKey} handleLogOut={this.handleLogOut} />
            
            <Switch>
              <Route exact path="/" 
                    render={(routeProps) => <PublicHomePage {...routeProps} />} />
              <Route exact path="/cities" component={PlaceholderPage} />
              <Route exact path="/about" component={PlaceholderPage} />
              <Route exact path="/login" 
                    render={() => <LogInPage handleLogIn={this.handleLogIn} />} />
              <Route exact path="/register" 
                    render={() => <RegisterPage handleLogIn={this.handleLogIn} />} />

              <Route exact path="/explore" component={withAuth(ExplorePage)} />
              <Route exact path="/profile" 
                    render={(routeProps) => <ProfilePage {...routeProps} />} />
              <Route exact path="/history" component={withAuth(HistoryPage)} />

              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </div>
      </HelmetProvider>
    );
  }
}

export default App;
