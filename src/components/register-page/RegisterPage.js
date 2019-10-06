import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FormTemplate from '../form-template/FormTemplate';
import './RegisterPage.sass';

class RegisterPage extends Component {

    render() {
        const { handleUsername, handleEmail, handlePassword, 
                handleEnterKey, handleSubmit,
                hasError, clearErrors } = this.props;

        return (
            <div className="register-main-div">
                <Helmet>
                    <title>Sign Up | House Explorer</title>
                </Helmet>
                <div className="register-wrapper">
                    <div className="register-form">
                        <h2 className="form-header">sign up</h2>
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
                            <div className={`form-element-name ${hasError[2] ? "invalid" : ""}`}>
                                email
                            </div>
                            <input  className={`form-element ${hasError[2] ? "invalid" : ""}`}
                                    onChange={handleEmail}
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