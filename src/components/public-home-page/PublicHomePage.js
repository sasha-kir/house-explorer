import React from 'react';
import './PublicHomePage.css';
import cover from '../../images/cover.png';

const PublicHomePage = ({ history }) => {
    
    const handleIntroBtnClick = () => {
        history.push("/register");
    }

    return(
        <div className="public-home-main-div">
            <div></div>
            <div></div>
            <div className="intro-wrapper">
                <p className="intro-heading">House<br/>Explorer</p>
                <p className="intro-text" >
                    Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Scelerisque mus neque class dolor. Adipiscing placerat tempor.
                </p>
                <button className="intro-btn" onClick={handleIntroBtnClick}>
                    get started
                </button>
            </div>
            <div className="cover-image-wrapper">
                <img className="cover-image" alt="abstract location illustration" src={cover} />
                <p className="cover-image-credit">&copy; &nbsp;
                    <a href="https://icons8.com/ouch/illustration/abstract-location-access" 
                       rel="noopener noreferrer" target="_blank">Icons 8</a> 
                </p>
            </div>
        </div>
    );
}

export default PublicHomePage;