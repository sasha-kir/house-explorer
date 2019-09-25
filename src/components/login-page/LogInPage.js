import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import FormTemplate from '../form-template/FormTemplate';
import './LogInPage.sass';

class LogInPage extends Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }

    handleFocus = (e) => {
        this.props.hidePlaceholder(e);
        this.username.current.className = "form-element";
        this.password.current.className = "form-element";
    }

    handleClick = () => {
        const { handleSubmit, hasError } = this.props;
        handleSubmit();
        this.username.current.className = `form-element ${hasError[0] ? "invalid" : ""}`;
        this.password.current.className = `form-element ${hasError[1] ? "invalid" : ""}`;
    }

    render() {
        const { handleUsername, handlePassword, showPlaceholder, 
                handleEnterKey, hasError, defaultPath } = this.props;
        return (
            <div className="login-main-div">
                <Helmet>
                    <title>Log In | House Explorer</title>
                </Helmet>
                <div className="login-wrapper">
                    <div className="login-form">
                        <h2 className="form-header">log in</h2> 
                        <input  className={`form-element ${hasError[0] ? "invalid" : ""}`}
                                ref={this.username}
                                onChange={handleUsername}
                                onFocus={this.handleFocus}
                                onBlur={(e) => showPlaceholder(e, "username")}
                                placeholder="username" type="text" />
                        <input  className={`form-element ${hasError[1] ? "invalid" : ""}`}
                                ref={this.password}
                                onChange={handlePassword}
                                onKeyDown={handleEnterKey}
                                onFocus={this.handleFocus}
                                onBlur={(e) => showPlaceholder(e, "password")}
                                placeholder="password" type="password" />
                        <button className="form-button"
                                onClick={this.handleClick}>
                            submit
                        </button>
                        <p className="link-to-other-form">
                            Don't have an account? &nbsp;
                            <Link to={defaultPath + "/register"}>Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(FormTemplate("login")(LogInPage));