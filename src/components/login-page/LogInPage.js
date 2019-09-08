import React, { Component } from 'react';
import './LogInPage.css';

import logo from '../../images/logo.svg';

class LogInPage extends Component {

    hidePlaceholder = (event) => {
        event.target.placeholder = "";
    }

    showPlaceholder = (event, placeholder) => {
        event.target.placeholder = placeholder;
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="login-main-div">
                <div className="login-wrapper">
                    <img className="logo-image" onClick={() => onRouteChange("home")}
                         alt="logo" src={logo} />
                    <div className="login-form">
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder} 
                               onBlur={(e) => this.showPlaceholder(e, "username")}
                               placeholder="username" type="text" />
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder}
                               onBlur={(e) => this.showPlaceholder(e, "password")}
                               placeholder="password" type="password" />
                        <button className="form-button">login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogInPage;