import React from 'react';
import './Alert.sass';

const Alert = ({ text, type, show }) => {
    return(
        <div className={`alert ${show ? "show" : ""} ${type}`}>
            {text}
        </div>
    )
};

export default Alert;