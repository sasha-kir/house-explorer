import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.css';

class RegisterPage extends Component {

    hidePlaceholder = (event) => {
        event.target.placeholder = "";
    }

    showPlaceholder = (event, placeholder) => {
        event.target.placeholder = placeholder;
    }

    render() {
        return (
            <div className="register-main-div">
                <div className="register-wrapper">
                    <div className="register-form">
                        <h2 className="form-header">sign up</h2>
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder} 
                               onBlur={(e) => this.showPlaceholder(e, "username")}
                               placeholder="username" type="text" />
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder} 
                               onBlur={(e) => this.showPlaceholder(e, "email")}
                               placeholder="email" type="text" />
                        <input className="form-element" 
                               onFocus={this.hidePlaceholder}
                               onBlur={(e) => this.showPlaceholder(e, "password")}
                               placeholder="password" type="password" />
                        <button className="form-button">get started</button>
                        <p className="link-to-other-form">
                            Already have an account? &nbsp;
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;