import React, { Component } from 'react';

import searchHouse from '../../images/search-house.png';
import searchError from '../../images/search-error.png';

import Alert from '../css-alert/Alert';

import './HouseInfoBlock.sass';

class HouseInfoBlock extends Component {
    constructor(props) {
        super(props);
        this.images = this.importAll(require.context('../../images/house-info-icons', false, /.*\.svg$/));
        this.state = {
            showHistoryAlert: false,
            alertType: ""
        }
    }

    importAll = (req) => {
        let images = {};
        req.keys().forEach(key => {
            images[key.slice(2, -4)] = req(key);
        });
        return images;
    };

    disableAlert = () => {
        setTimeout(() => { this.setState({ showHistoryAlert: false }) }, 3000);
    }

    handleBookmarkClick = async () => {
        try {
            let response = await fetch(process.env.REACT_APP_SERVER_URL + "/save_house", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: localStorage.getItem("userToken"),
                houseInfo: this.props.infoBlock,
                mapCoords: this.props.mapCoords
            })
            });
            if (response.status === 200) {
                this.setState({ showHistoryAlert: true, alertType: "success" }, this.disableAlert);
            } else {
                this.setState({ showHistoryAlert: true, alertType: "error" }, this.disableAlert);
            }
        } catch (TypeError) {
            this.setState({ showHistoryAlert: true, alertType: "error" }, this.disableAlert);
        }
    }

    renderStartBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header house-info-start-header">
                    <span className="header-highlight">start exploring</span>
                </div>
                <div className="house-info-start-content">
                    <img 
                        src={searchHouse}
                        alt="magnifying glass over paper with house on it"
                        title="Icon made by IYIKON from pngtree.com"
                    />
                    <p> 
                        Start entering an address and choose from the suggestions 
                        to get the full info about the house. <br/><br/>
                        <span className="help-text">
                            Your location was determined automatically. 
                            You can choose another city by using the menu on the map.
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    renderHouseBlock = () => {
        const { infoBlock } = this.props;
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header house-info-content-header">
                    <div className="content-header">
                        <span className="header-highlight"> about this house</span>
                    </div>
                    <img    src={this.images["bookmark"]} 
                            alt="bookmark" 
                            title="Add house to history"
                            onClick={this.handleBookmarkClick}
                    />
                </div>
                <div className="house-info-house-content">
                    <Alert  show={this.state.showHistoryAlert} 
                            text={
                                this.state.alertType === "success" 
                                    ? "House added to history" 
                                    : "Error adding to history"
                            }
                            type={this.state.alertType}
                    />
                    <div className="house-info-block address">
                        <img    
                            src={this.images["address"]} 
                            alt="house inside map pin"
                            title="Icon made by Freepik from www.flaticon.com"
                        />
                        <p>{infoBlock.address}</p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={this.images["crane"]} 
                            alt="crane" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <span className="key">built in:</span>
                            <span>{infoBlock.yearBuilt}</span>
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={this.images["design"]} 
                            alt="paper and ruler" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <span className="key">house type:</span>
                            { 
                                infoBlock.houseTypeLink
                                  ? <a  href={infoBlock.houseTypeLink} 
                                        rel="noopener noreferrer" 
                                        target="_blank"
                                    >
                                        {infoBlock.houseType}
                                    </a>
                                  : <span>{infoBlock.houseType}</span>
                            }
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={this.images["skyscraper"]} 
                            alt="two tall houses" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <span className="key">floor count:</span>
                            <span>{infoBlock.floorCount}</span>
                        </p>
                    </div>
                    <div className="house-info-block">
                        <img 
                            src={this.images["wall"]} 
                            alt="brick wall" 
                            title="Icon made by Freepik from www.flaticon.com" 
                        />
                        <p className="double-row">
                            <span className="key">walls:</span>
                            <span>{infoBlock.wallsMaterial}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    
    renderErrorBlock = () => {
        return (
            <div className="house-info-wrapper">
                <div className="house-info-header house-info-error-header">
                    <span className="header-highlight">error: house not found</span>
                </div>
                <div className="house-info-error-content">
                    <img 
                        src={searchError}
                        alt="exclamation point inside magnifying glass"
                        title="Icon made by syedhassan from pngtree.com"
                    />
                    <p> 
                        Please check the address and try again. <br/><br/>
                        <span className="help-text">
                            If an address is not in the suggestions, 
                            try changing the city by using the menu on the map.
                        </span>
                    </p>
                </div>
            </div>
        ); 
    }

    contentSwitcher = () => {
        if (this.props.startState) {
            return this.renderStartBlock();
        } else if (this.props.addressNotFound) {
            return this.renderErrorBlock();
        } else {
            return this.renderHouseBlock();
        }
    }

    render() {
        return(
            <div className="house-info-main-div">
                {this.contentSwitcher()}
            </div>
        );
    }
};

export default HouseInfoBlock;

