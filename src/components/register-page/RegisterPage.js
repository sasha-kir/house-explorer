import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FormTemplate from '../form-template/FormTemplate';
import './RegisterPage.sass';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.username= React.createRef();
        this.email= React.createRef();
        this.password= React.createRef();
    }

    handleFocus = (e) => {
        this.props.hidePlaceholder(e);
        this.username.current.className = "form-element";
        this.email.current.className = "form-element";
        this.password.current.className = "form-element";
    }

    handleClick = () => {
        const { handleSubmit, hasError } = this.props;
        handleSubmit();
        this.username.current.className = `form-element ${hasError[0] ? "invalid" : ""}`;
        this.password.current.className = `form-element ${hasError[1] ? "invalid" : ""}`;
        this.email.current.className = `form-element ${hasError[2] ? "invalid" : ""}`;
    }

    render() {
        const { showPlaceholder, 
                handleUsername, handleEmail,
                handlePassword, handleEnterKey, 
                hasError } = this.props;

        return (
            <div className="register-main-div">
                <Helmet>
                    <title>Sign Up | House Explorer</title>
                </Helmet>
                <div className="register-wrapper">
                    <div className="register-form">
                        <h2 className="form-header">sign up</h2>
                        <input className={`form-element ${hasError[0] ? "invalid" : ""}`} 
                                ref={this.username}
                                onChange={handleUsername}
                                onFocus={this.handleFocus}
                                onBlur={(e) => showPlaceholder(e, "username")}
                                placeholder="username" type="text" />
                        <input className={`form-element ${hasError[2] ? "invalid" : ""}`}
                                ref={this.email}
                                onChange={handleEmail}
                                onFocus={this.handleFocus}
                                onBlur={(e) => showPlaceholder(e, "email")}
                                placeholder="email" type="text" />
                        <input className={`form-element ${hasError[1] ? "invalid" : ""}`}
                                ref={this.password}
                                onChange={handlePassword}
                                onKeyDown={handleEnterKey}
                                onFocus={this.handleFocus}
                                onBlur={(e) => showPlaceholder(e, "password")}
                                placeholder="password" type="password" />
                        <button className="form-button"
                                onClick={this.handleClick}>
                            get started
                        </button>
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

export default withRouter(FormTemplate("register")(RegisterPage));