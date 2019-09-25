import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean(+localStorage.loggedIn) || false
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

  handleRegistration = () => {
    console.log("app saw you register");
    this.setState({ loggedIn: true });
    localStorage.setItem("loggedIn", 1);
  }

  render() {
    const { loggedIn } = this.state;
    const defaultPath = this.props.match.path;
    return (
      <HelmetProvider>
        <div className="body">
            <Navigation loggedIn={loggedIn} defaultPath={defaultPath} handleLogOut={this.handleLogOut} />
            
            <Switch>
              <Route exact path={defaultPath} 
                    render={(routeProps) => <PublicHomePage {...routeProps} loggedIn={loggedIn} 
                                                                            defaultPath={defaultPath}/>}                                                             
               />
              <Route exact path={defaultPath + "cities"} component={PlaceholderPage} />
              <Route exact path={defaultPath + "about"} component={PlaceholderPage} />
              <Route exact path={defaultPath + "login"} 
                    render={() => <LogInPage handleLogin={this.handleLogin} 
                                             defaultPath={defaultPath} />}                            
              />
              <Route exact path={defaultPath + "register"}
                    render={() => <RegisterPage handleRegistration={this.handleRegistration} 
                                                defaultPath={defaultPath} />}                             
              />
              <ProtectedRoute exact path={defaultPath + "explore"} auth={loggedIn} component={ExplorePage} />
              <ProtectedRoute exact path={defaultPath + "profile"} auth={loggedIn} component={PlaceholderPage} />
              <ProtectedRoute exact path={defaultPath + "history"} auth={loggedIn} component={PlaceholderPage} />
              <Route component={NotFoundPage} />
            </Switch>
        </div>
      </HelmetProvider>
    );
  }
}

export default App;
