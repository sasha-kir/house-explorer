import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import FormTemplate from '../form-template/FormTemplate';
import './LogInPage.sass';

class LogInPage extends Component {

    render() {
        const { handleUsername, handlePassword,
                handleEnterKey, handleSubmit,
                hasError, clearErrors } = this.props;
        return (
            <div className="login-main-div">
                <Helmet>
                    <title>Log In | House Explorer</title>
                </Helmet>
                <div className="login-wrapper">
                    <div className="login-form">
                        <h2 className="form-header">log in</h2> 
                        <div className="form-element-wrapper">
                            <div className={`form-element-name ${hasError[0] ? "invalid" : ""}`}>
                                username
                            </div>
                            <input  className={`form-element ${hasError[0] ? "invalid" : ""}`}
                                    onChange={handleUsername}
                                    onFocus={clearErrors}
                                    type="text" />
                        </div>
                        <div className="form-element-wrapper">
                            <div className={`form-element-name ${hasError[1] ? "invalid" : ""}`}>
                                password
                            </div>
                            <input  className={`form-element ${hasError[1] ? "invalid" : ""}`}
                                    onChange={handlePassword}
                                    onKeyDown={handleEnterKey}
                                    onFocus={clearErrors}
                                    type="password" />
                        </div>
                        <button className="form-button"
                                onClick={handleSubmit}>
                            submit
                        </button>
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

export default withRouter(FormTemplate("login")(LogInPage));