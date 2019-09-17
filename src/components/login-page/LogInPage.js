import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import FormTemplate from '../form-template/FormTemplate';
import './LogInPage.css';

const LogInPage = ({ hidePlaceholder, showPlaceholder, handleUsername, 
                     handlePassword, handleEnterKey, handleSubmit } ) => {
    return (
        <div className="login-main-div">
            <Helmet>
                <title>Log In | House Explorer</title>
            </Helmet>
            <div className="login-wrapper">
                <div className="login-form">
                    <h2 className="form-header">log in</h2> 
                    <input className="form-element" 
                            onChange={handleUsername}
                            onFocus={hidePlaceholder} 
                            onBlur={(e) => showPlaceholder(e, "username")}
                            placeholder="username" type="text" />
                    <input className="form-element"
                            onChange={handlePassword}
                            onKeyDown={handleEnterKey}
                            onFocus={hidePlaceholder}
                            onBlur={(e) => showPlaceholder(e, "password")}
                            placeholder="password" type="password" />
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

export default withRouter(FormTemplate("login")(LogInPage));