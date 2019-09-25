import React, { Component } from 'react';

const FormTemplate = (formType) => (WrappedComponent) => {
    return class Form extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: "",
                email: "",
                password: "",
                hasError: [false, false]
            };
        }
    
        hidePlaceholder = event => {
            event.target.placeholder = "";
        }
    
        showPlaceholder = (event, placeholder) => {
            event.target.placeholder = placeholder;
        }
    
        handleUsernameChange = event => {
            this.setState({ username: event.target.value });
        }
    
        handlePasswordChange = event => {
            this.setState({ password: event.target.value });
        }
        
        handleEmailChange = event => {
            this.setState({ email: event.target.value })
        }

        handleLoginSubmit = () => {
            const { username, password } = this.state;
            const users = ["sasha"];
            const passwords = ["secret"];
            if (!username || !password) {
                console.log("please fill in all the necessary fields");
                this.setState({ hasError: [!username, !password] });
            } else if (!users.includes(username) || !passwords.includes(password)) {
                console.log("wrong username or password");
                this.setState({ hasError: [true, true] });
            } else {
                console.log("logged in successfully");
                this.setState({ hasError: [false, false] });
                this.props.handleLogin();
                this.props.history.push(this.props.defaultPath + "explore");
            }
        }

        handleRegisterSubmit = () => {
            const {username, email, password } = this.state;
            if (!username || !email || !password) {
                console.log("please fill in all the necessary fields");
            } else {
                console.log("registered!");
                this.props.handleRegistration();
                this.props.history.push(this.props.defaultPath + "explore");
            }
        }

        handleEnterKey = event => {
            if (event.key === "Enter") {
                switch(formType) {
                    case "login":
                        this.handleLoginSubmit();
                        break;
                    case "register":
                        this.handleRegisterSubmit();
                        break;
                    default:
                        break;
                }
            }
        }

        render() {
            const passedProps = {
                hidePlaceholder: this.hidePlaceholder,
                showPlaceholder: this.showPlaceholder,
                handleUsername: this.handleUsernameChange,
                handlePassword: this.handlePasswordChange,
                handleEnterKey: this.handleEnterKey,
                defaultPath: this.props.defaultPath,
            };

            switch(formType) {
                case "login":
                    passedProps["handleSubmit"] = this.handleLoginSubmit;
                    passedProps["hasError"] = this.state.hasError;
                    break;
                case "register":
                    passedProps["handleEmail"] = this.handleEmailChange;
                    passedProps["handleSubmit"] = this.handleRegisterSubmit;
                    break;
                default:
                    break;
            };

            return(
                <WrappedComponent {...passedProps} />
            )
        }
    }
}

export default FormTemplate;