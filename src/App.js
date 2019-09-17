import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ProtectedRoute from './components/protected-route/ProtectedRoute';

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
      loggedIn: localStorage.loggedIn || false
    }
  }
  
  handleLogOut = () => {
    console.log("you're logged out");
    this.setState({ loggedIn: false });
    localStorage.setItem("loggedIn", false);
  }

  handleLogin = () => {
    console.log("app saw you log in");
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", true);
  }

  handleRegistration = () => {
    console.log("app saw you register");
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", true);
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="body">
        <Router>
          <Navigation loggedIn={loggedIn} handleLogOut={this.handleLogOut} />
          
          <Switch>
            <Route exact path="/" component={PublicHomePage} />
            <Route exact path="/cities" component={PlaceholderPage} />
            <Route exact path="/about" component={PlaceholderPage} />
            <Route exact path="/login" 
                   render={() => <LogInPage handleLogin={this.handleLogin} />} />
            <Route path="/register" 
                   render={() => <RegisterPage handleRegistration={this.handleRegistration} />} />
            <ProtectedRoute exact path="/explore" auth={loggedIn} component={ExplorePage} />
            <ProtectedRoute exact path="/profile" auth={loggedIn} component={PlaceholderPage} />
            <ProtectedRoute exact path="/history" auth={loggedIn} component={PlaceholderPage} />
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
