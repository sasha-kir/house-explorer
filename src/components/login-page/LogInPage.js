import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

import FormTemplate from '../form-template/FormTemplate';
import FormInput from '../form-input/FormInput';

import './LogInPage.sass';

class LogInPage extends Component {

    render() {
        const { handleUsername, handlePassword,
                handleEnterKey, handleSubmit,
                hasError, errorText, clearErrors } = this.props;
        return (
            <div className="login-main-div">
                <Helmet>
                    <title>Log In | House Explorer</title>
                </Helmet>
                <div className="login-wrapper">
                    <div className="login-form">
                        <h2 className="form-header">log in</h2> 
                        <FormInput  inputName="username"
                                    inputType="text"
                                    handleInput={handleUsername}
                                    hasError={hasError[0]}
                                    clearErrors={clearErrors}
                                    errorText={errorText[0]}
                        />
                        <FormInput  inputName="password"
                                    inputType="password"
                                    handleInput={handlePassword}
                                    hasError={hasError[1]}
                                    clearErrors={clearErrors}
                                    errorText={errorText[1]}
                                    onKeyDown={handleEnterKey}
                        />
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