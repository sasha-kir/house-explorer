import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LogInPage.css';

class LogInPage extends Component {

    hidePlaceholder = (event) => {
        event.target.placeholder = "";
    }

    showPlaceholder = (event, placeholder) => {
        event.target.placeholder = placeholder;
    }

    render() {
        return (
            <div className="login-main-div">
                <div className="login-wrapper">
                    <div className="login-form">
                        <h2 className="form-header">log in</h2> 
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder} 
                               onBlur={(e) => this.showPlaceholder(e, "username")}
                               placeholder="username" type="text" />
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder}
                               onBlur={(e) => this.showPlaceholder(e, "password")}
                               placeholder="password" type="password" />
                        <button className="form-button">submit</button>
                        <p className="link-to-other-form">
                            Don't have an account? &nbsp;
                            <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogInPage;