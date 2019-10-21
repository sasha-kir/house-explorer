import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import FormTemplate from '../form-template/FormTemplate';
import FormInput from '../form-input/FormInput';

import './RegisterPage.sass';

class RegisterPage extends Component {

    render() {
        const { handleUsername, handleEmail, handlePassword, 
                handleEnterKey, handleSubmit,
                hasError, errorText, clearErrors } = this.props;

        return (
            <div className="register-main-div">
                <Helmet>
                    <title>Sign Up | House Explorer</title>
                </Helmet>
                <div className="register-wrapper">
                    <div className="register-form">
                        <h2 className="form-header">sign up</h2>
                        <FormInput  inputName="username"
                                    inputType="text"
                                    handleInput={handleUsername}
                                    hasError={hasError[0]}
                                    clearErrors={clearErrors}
                                    errorText={errorText[0]}
                        />
                        <FormInput  inputName="email"
                                    inputType="text"
                                    handleInput={handleEmail}
                                    hasError={hasError[2]}
                                    clearErrors={clearErrors}
                                    errorText={errorText[2]}
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