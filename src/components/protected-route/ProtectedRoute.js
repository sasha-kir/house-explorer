import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...props }) => {
    return (
        <Route {...props} render={props => (
            auth
              ? <Component {...props} /> 
              : <Redirect to='/login' />
        )} />
    );
};

export default ProtectedRoute;