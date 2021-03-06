import React, { Component } from 'react';
import {    Map, 
            Placemark, 
            ZoomControl, 
            GeolocationControl, 
            ListBox, 
            ListBoxItem 
        } from 'react-yandex-maps';

import * as waitUntil from 'async-wait-until';
import ClickOutside from 'react-click-outside';

import Spinner from '../spinner/Spinner';
import './YandexMap.sass';

class YandexMap extends Component { 
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            // ymaps: null,
            isMapReady: false,
            isMapError: false,
            showBalloon: false,
            clickCoords: this.props.mapCoords,
            clickAddress: "",
            isAddressValid: false,
            mapWidth: this.getMapWidth() + "px"
        };
        this.mapContentRef = React.createRef();
    }

    getMapWidth = () => {
        if (window.innerWidth > 950) return window.innerWidth - 550;
        else return window.innerWidth - 40;
    }
    componentDidMount() {
        this.watchMapLoading();
        this._isMounted = true;
        window.addEventListener('resize', this.resizeMap);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.resizeMap);
	}

    watchMapLoading = async () => {
        try {
            let mapLoaded = await waitUntil(() => {
                return this.mapContentRef.current.childElementCount > 0;
            }, 20000);
            if (this._isMounted) this.setState({ 
                isMapReady: mapLoaded,
                isMapError: false
            });
        } catch {
            if (this._isMounted) this.setState({ 
                isMapReady: true,
                isMapError: true
             });
        }
    }

    resizeMap = () => {
        let newWidth;
        if (window.innerWidth > 950) newWidth = window.innerWidth - 550;
        else newWidth = window.innerWidth - 40;
        this.setState({ mapWidth: newWidth + "px" });
    }

    onMapClick = async (event) => {
        const clickCoords = event.get("coords");
        let address, isAddressValid;
        const location = await this.props.reverseGeocodeHandler(clickCoords, "house");

        if (location) {
            address = location.name;
            isAddressValid = true;
        } else{
            address = "No houses here!";
            isAddressValid = false;
        }

        this.setState({ 
            clickAddress: address,
            clickCoords,
            showBalloon: true,
            isAddressValid
        });
    }

    handleClickOutside = () => {
        if (this._isMounted) this.setState({ showBalloon: false });
    };

    detectLocation = (event) => {
        console.log(event.get("position"));
    }

    copyBalloonAddress = () => {
        let balloonTextStr = String(/balloon-text/).substring(1).slice(0,-1);
        let textAreaStr = String(/textarea/).substring(1).slice(0,-1);
        let fixedStr = String(/fixed/).substring(1).slice(0,-1);
        let copyStr = String(/copy/).substring(1).slice(0,-1);
        let balloonButtonStr = String(/balloon-button/).substring(1).slice(0,-1);
        let copiedStr = String(/copied!/).substring(1).slice(0,-1);
        const address = document.getElementById(balloonTextStr).textContent;
        const textArea = document.createElement(textAreaStr);
        document.body.appendChild(textArea);
        textArea.value = address;
        textArea.style.position = fixedStr;
        textArea.style.opacity = 0;
        textArea.focus();
        textArea.select();
        document.execCommand(copyStr);
        document.body.removeChild(textArea);
        let balloonButton = document.getElementById(balloonButtonStr);
        balloonButton.textContent = copiedStr;
        balloonButton.disabled = true;
    }

    renderMap = () => {
        const { 
            mapCoords, mapAddress, startState, 
            cityList, locationInEnglish, 
            handleCityChoice, getUserLocation 
        } = this.props;
        return (
            <Map
                style={{width: this.state.mapWidth}}
                className="map"
                state={{
                        center: mapCoords,
                        zoom: startState ? 10 : 17,
                }}
                modules={["geolocation", "geocode"]}
                onClick={this.onMapClick}
                onLoad={ymaps => getUserLocation(ymaps)}
                // onLoad={ ymaps => { this.setState({ ymaps }) } }
            >
                <ZoomControl 
                    options={{ 
                        position: {
                            left: 'auto',
                            right: 20,
                            top: 170
                        }
                    }} 
                />
                <Placemark
                    key={1}
                    modules={['geoObject.addon.hint']}
                    geometry={mapCoords}
                    properties={{
                        hintContent: mapAddress
                    }}
                    options={{
                        preset: 'islands#dotIcon',
                        iconColor: '#343543'
                    }}   
                />
                <Placemark
                    balloonContent={<div>this.state.clickAddress</div>}
                    instanceRef={ ref => { 
                        if (ref && this.state.showBalloon) {
                            return ref.balloon.open();
                        } else if (ref && !this.state.showBalloon) {
                            return ref.balloon.close();
                        }
                    } } 
                    key={2}
                    geometry={this.state.clickCoords}
                    modules={["geoObject.addon.balloon"]}
                    onBalloonClose={() => { this.setState({showBalloon: false}) }}
                    properties={
                        this.state.isAddressValid 
                        ? {
                                balloonContentBody: [
                                    '<div class="balloon">',
                                    '<address id="balloon-text">',
                                    this.state.clickAddress,
                                    '</address>',
                                    '<br/>',
                                    '<button id="balloon-button" ',
                                    `onclick='javascript:(${this.copyBalloonAddress})()'>`,
                                    'copy address',
                                    '</button>',
                                    '</div>'
                                ].join('')
                            }
                        : {
                                balloonContentBody: [
                                    '<div class="balloon">',
                                    this.state.clickAddress,
                                    '</div>'
                                ].join('')
                        }
                    }
                    options={{ 
                        visible: false
                    }}
                />
                <ListBox 
                    data={{ content: 'Select a city ' }}
                    onSelect={handleCityChoice}
                >
                    {cityList.map(city => <ListBoxItem 
                                            key={city.id} 
                                            data={{ 
                                                    content: city.name,
                                                    center: city.location
                                            }}
                                            state={{
                                                     selected: (city.name === locationInEnglish[0] || 
                                                            city.isoCode === locationInEnglish[1])
                                            }}
                                             />
                    )}
                </ListBox>
                <GeolocationControl onLocationChange={this.detectLocation}/>
            </Map>
        );
    }
    render() {
        return (
            <ClickOutside onClickOutside={this.handleClickOutside}>
                <div className="map-main-div" style={{width: this.state.mapWidth}}>
                    <div className="spinner-wrapper">
                        <Spinner isMapReady={this.state.isMapReady} />
                    </div>
                    <div className="map-content" ref={this.mapContentRef}>
                        { this.state.isMapError
                            ?   <div className="map-error" style={{width: this.state.mapWidth}}>
                                    error loading map :(
                                </div>
                            : this.renderMap()
                        }
                    </div>
                </div>
            </ClickOutside>
        );
    }
};

export default YandexMap;