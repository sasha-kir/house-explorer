import React, { Component } from 'react';

const FormTemplate = (formType) => (WrappedComponent) => {
    return class Form extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: "",
                email: "",
                password: "",
                hasError: [false, false, false],    // [username, password, email]
                errorText: ["username", "password", "email"]
            };
        }
        
        clearErrors = () => {
            this.setState({ 
                hasError: [false, false, false], 
                errorText: ["username", "password", "email"]
            });
        }

        showServerConnectionError = () => {
            this.setState({ 
                hasError: [true, true, true],
                errorText: [ 
                    " ", 
                    "Server disconnected. Please try again later.", 
                    " "
                ] 
            });
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

        handleLoginSubmit = async () => {
            const { username, password } = this.state;

            if (!username || !password) {
                this.setState({ 
                    hasError: [!username, !password, false],
                    errorText: [ 
                        username ? "username" : "Required field", 
                        password ? "password" : "Required field", 
                        "email"
                    ]
                });
            } else {
                try {
                    let response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", {
                        	method: "post",
                        	headers: {'Content-Type': 'application/json'},
                        	body: JSON.stringify({
                        		username: username,
                        		password: password
                        	})
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        this.props.handleLogIn(data);
                        this.props.history.push("/explore");
                    } else {
                        this.setState({ 
                            hasError: [true, true, false],
                            errorText: [ 
                                " ", 
                                "Wrong username or password", 
                                "email"
                            ]
                        });
                    }
                } catch (TypeError) {
                    this.showServerConnectionError();
                }
            } 
        }

        handleRegisterSubmit = async () => {
            const { username, email, password } = this.state;
            
            if (!username || !email || !password) {
                this.setState({ 
                    hasError: [!username, !password, !email],
                    errorText: [ 
                        username ? "username" : "Required field", 
                        password ? "password" : "Required field", 
                        email    ? "email" : "Required field",
                    ] 
                });
            } else {
                try {
                    let response = await fetch(process.env.REACT_APP_SERVER_URL + "/register", {
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            username: username,
                            email: email,
                            password: password
                        })
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        this.props.handleLogIn(data);
                        this.props.history.push("/explore");
                    } else {
                        if (data.error.includes("username")) {
                            this.setState({ 
                                hasError: [true, false, false],
                                errorText: [ 
                                    "Username already in use", 
                                    "password", 
                                    "email"
                                ] 
                            });
                        } else if (data.error.includes("email")) {
                            this.setState({ 
                                hasError: [false, false, true],
                                errorText: [ 
                                    "username", 
                                    "password", 
                                    "Email already in use"
                                ] 
                            });
                        } else {
                            this.setState({ 
                                hasError: [true, true, true],
                                errorText: [ 
                                    " ", 
                                    "Unknown error. Please try again later.", 
                                    " "
                                ] 
                            });
                        }
                    }
                } catch (TypeError) {
                    this.showServerConnectionError();
                }
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
                handleUsername: this.handleUsernameChange,
                handlePassword: this.handlePasswordChange,
                handleEnterKey: this.handleEnterKey,
                hasError: this.state.hasError,
                errorText: this.state.errorText,
                clearErrors: this.clearErrors
            };

            switch(formType) {
                case "login":
                    passedProps["handleSubmit"] = this.handleLoginSubmit;
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