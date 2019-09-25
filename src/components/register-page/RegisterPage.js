import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FormTemplate from '../form-template/FormTemplate';
import './RegisterPage.sass';

const RegisterPage = ({ hidePlaceholder, showPlaceholder, handleUsername, 
                        handleEmail, handlePassword, handleEnterKey, handleSubmit, defaultPath }) => {
    return (
        <div className="register-main-div">
            <Helmet>
                <title>Sign Up | House Explorer</title>
            </Helmet>
            <div className="register-wrapper">
                <div className="register-form">
                    <h2 className="form-header">sign up</h2>
                    <input className="form-element" 
                            onChange={handleUsername}
                            onFocus={hidePlaceholder} 
                            onBlur={(e) => showPlaceholder(e, "username")}
                            placeholder="username" type="text" />
                    <input className="form-element" 
                            onChange={handleEmail}
                            onFocus={hidePlaceholder} 
                            onBlur={(e) => showPlaceholder(e, "email")}
                            placeholder="email" type="text" />
                    <input className="form-element" 
                            onChange={handlePassword}
                            onKeyDown={handleEnterKey}
                            onFocus={hidePlaceholder}
                            onBlur={(e) => showPlaceholder(e, "password")}
                            placeholder="password" type="password" />
                    <button className="form-button"
                            onClick={handleSubmit}>
                        get started
                    </button>
                    <p className="link-to-other-form">
                        Already have an account? &nbsp;
                        <Link to={defaultPath + "/login"}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default withRouter(FormTemplate("register")(RegisterPage));