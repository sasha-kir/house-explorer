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
    if (localStorage.user) {
      this.state = {...this.state, user: JSON.parse(localStorage.user) };
    }
  }
  
  handleLogOut = () => {
    this.setState({ 
      loggedIn: false, 
      user: { username: "",  email: "", joined: "" }
    });
    localStorage.setItem("loggedIn", 0);
    localStorage.setItem("user", "");
  }

  handleLogIn = (userData) => {
    const { username, email, joined } = userData;
    this.setState({ loggedIn: true, user: { username, email, joined } });
    localStorage.setItem("loggedIn", 1);
    localStorage.setItem("user", JSON.stringify(userData));
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
                    render={() => <LogInPage handleLogIn={this.handleLogIn} />} />
              <Route exact path="/register" 
                    render={() => <RegisterPage handleLogIn={this.handleLogIn} />} />
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
