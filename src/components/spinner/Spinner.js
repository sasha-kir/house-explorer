import React from 'react';
import './Spinner.sass';

const Spinner = ({ isMapReady }) => {
    return(
        <div className={`spinner ${isMapReady ? "hidden-spinner" : ""}`}>
            <i className="far fa-compass fa-spin"></i>
        </div>
    )
};

export default Spinner;