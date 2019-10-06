import React, { Component } from 'react';

const FormTemplate = (formType) => (WrappedComponent) => {
    return class Form extends Component {
        constructor(props) {
            super(props);
            this.state = {
                username: "",
                email: "",
                password: "",
                hasError: [false, false, false] // [username, password, email]
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

            // fetch("http://localhost:5000/login", {
			// 	method: "post",
			// 	headers: {'Content-Type': 'application/json'},
			// 	body: JSON.stringify({
			// 		username: username,
			// 		password: password
			// 	})
			// })

            if (!username || !password) {
                console.log("please fill in all the necessary fields");
                this.setState({ hasError: [!username, !password, false] });
            } else if (!users.includes(username) || !passwords.includes(password)) {
                console.log("wrong username or password");
                this.setState({ hasError: [true, true, false] });
            } else {
                console.log("logged in successfully");
                this.setState({ hasError: [false, false, false] });
                this.props.handleLogin();
                this.props.history.push("/explore");
            }
        }

        handleRegisterSubmit = async () => {
            const { username, email, password } = this.state;
            
            if (!username || !email || !password) {
                this.setState({ hasError: [!username, !password, !email] });
                console.log("please fill in all the necessary fields");
            } else {
                let response = await fetch("http://localhost:5000/register", {
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
                    this.setState({ hasError: [false, false, false] });
                    this.props.handleRegistration(data);
                    this.props.history.push("/explore");
                } else {
                    if (data.error.includes("username")) {
                        this.setState({ hasError: [true, false, false] });
                    } else if (data.error.includes("email")) {
                        this.setState({ hasError: [false, false, true] });
                    }
                    console.log(data.error);
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
                hidePlaceholder: this.hidePlaceholder,
                showPlaceholder: this.showPlaceholder,
                handleUsername: this.handleUsernameChange,
                handlePassword: this.handlePasswordChange,
                handleEnterKey: this.handleEnterKey,
                hasError: this.state.hasError
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