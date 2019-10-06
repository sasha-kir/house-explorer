import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';

import './App.sass';

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
      loggedIn: Boolean(+localStorage.loggedIn) || false,
      user: {
        username: "",
        email: "",
        joined: ""
      }
    };
    if (localStorage.user !== undefined) {
      this.state = {...this.state, user: JSON.parse(localStorage.user) };
    }
  }
  
  handleLogOut = () => {
    console.log("you're logged out");
    this.setState({ loggedIn: false });
    localStorage.setItem("loggedIn", 0);
  }

  handleLogin = () => {
    console.log("app saw you log in");
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", 1);
  }

  handleRegistration = (userData) => {
    const { username, email, joined } = userData;
    this.setState({ loggedIn: true, user: { username, email, joined } });
    localStorage.setItem("loggedIn", 1);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("registered!");
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <HelmetProvider>
        <div className="body">
          <Router basename="/house-explorer">
            <Navigation loggedIn={loggedIn} handleLogOut={this.handleLogOut} />
            
            <Switch>
              <Route exact path="/" 
                    render={(routeProps) => <PublicHomePage {...routeProps} loggedIn={loggedIn} />} />
              <Route exact path="/cities" component={PlaceholderPage} />
              <Route exact path="/about" component={PlaceholderPage} />
              <Route exact path="/login" 
                    render={() => <LogInPage handleLogin={this.handleLogin} />} />
              <Route exact path="/register" 
                    render={() => <RegisterPage handleRegistration={this.handleRegistration} />} />
              <ProtectedRoute exact path="/explore" auth={loggedIn} component={ExplorePage} />
              <ProtectedRoute exact path="/profile" auth={loggedIn} component={PlaceholderPage} />
              <ProtectedRoute exact path="/history" auth={loggedIn} component={PlaceholderPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </div>
      </HelmetProvider>
    );
  }
}

export default App;
