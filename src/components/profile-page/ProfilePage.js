import React, { Component } from 'react';
import { Helmet } from "react-helmet-async";

import withAuth from '../with-auth/withAuth';

import './ProfilePage.sass';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userpicSrc: "",
            username: "",
            email: "",
            daysRegistered: ""
        };
    }

    async componentDidMount() {
        const token = localStorage.getItem("userToken");
        try {
            let response = await fetch("http://localhost:5000/profile", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                let data = await response.json();
                let { userPic, username, email, daysRegistered } = data;
                this.setState({ userPic, username, email, daysRegistered, loading: false });
            } else {
                console.log("error fetching profile from server");
                this.setState({ loading: false });
            }
        } catch (TypeError) {
            console.log("error fetching profile from server");
            this.setState({ loading: false });
        }
    }

    render() {
        if (this.state.loading) return null;
        return (
            <div className="profile-main-div">
                <Helmet>
                    <title>Profile | House Explorer</title>
                </Helmet>
                <div className="profile-wrapper">
                    <div className="profile-image">
                        <img src={this.state.userPic} alt="userpic" />
                    </div>
                    <div className="profile-days-text">
                        exploring houses for {this.state.daysRegistered} 
                        &nbsp;{this.state.daysRegistered === 1 ? "day" : "days"}
                    </div>
                    <div className="profile-form">
                        <div className="profile-form-element-wrapper">
                            <div className="profile-form-element-name">
                                username
                            </div>
                            <input className="profile-form-element" type="text"
                                   value={this.state.username} disabled
                            />
                        </div>
                        <div className="profile-form-element-wrapper">
                            <div className="profile-form-element-name">
                                email
                            </div>
                            <input className="profile-form-element" type="text"
                                   value={this.state.email} disabled
                            />
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default withAuth(ProfilePage);