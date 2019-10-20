import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {

    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    async componentDidMount() {
        try {
            let token = localStorage.getItem('userToken');
            let response = await fetch('http://localhost:5000/check_token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false, redirect: true });
            };
        } catch (TypeError) {
            console.log('server error: could not check token');
            this.setState({ loading: false, redirect: true });
        }
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}