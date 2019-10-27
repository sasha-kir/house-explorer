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
            showBalloon: false,
            clickCoords: this.props.mapCoords,
            clickAddress: "",
            isAddressValid: false,
        };
        this.mapContentRef = React.createRef();
        this.yandexAPIKey = process.env.REACT_APP_YANDEX_API_KEY;
    }

    componentDidMount() {
        this.watchMapLoading();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
	}

    watchMapLoading = async () => {
        try {
            let mapLoaded = await waitUntil(() => {
                return this.mapContentRef.current.childElementCount > 0;
            }, 20000);
            if (this._isMounted) this.setState({ isMapReady: mapLoaded });
        } catch {
            console.log("map waiting timed out");
            if (this._isMounted) this.setState({ isMapReady: true });
        }
    }

    onMapClick = async (event) => {
        const clickCoords = event.get("coords");
        let geoUrl = new URL("https://geocode-maps.yandex.ru/1.x");
        let params = {
            geocode: `${clickCoords[1]}, ${clickCoords[0]}`,
            kind: "house",
            format: "json",
            apikey: this.yandexAPIKey,
            results: 1
        };
        Object.keys(params).forEach(key => geoUrl.searchParams.append(key, params[key]))
        let geocodeResult = await fetch(geoUrl);
        let data = await geocodeResult.json();

        let address, isAddressValid;
        try {
            address = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
            isAddressValid = true;
        } catch (TypeError) {
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
        const address = document.getElementById('balloon-text').textContent;
        const textArea = document.createElement('textarea');
        document.body.appendChild(textArea);
        textArea.value = address;
        textArea.style.position = 'fixed';
        textArea.style.opacity = 0;
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        let balloonButton = document.getElementById('balloon-button');
        balloonButton.textContent = 'copied!';
        balloonButton.disabled = true;
    }

    render() {
        const { mapCoords, mapAddress, startState, 
                cityList, locationInEnglish, 
                handleCityChoice } = this.props;

        return (
            <ClickOutside onClickOutside={this.handleClickOutside}>
                <div className="map-main-div">
                    <div className="spinner-wrapper">
                        <Spinner isMapReady={this.state.isMapReady} />
                    </div>
                    <div className="map-content" ref={this.mapContentRef}>
                        <Map 
                            className="map"
                            state={{
                                    center: mapCoords,
                                    zoom: startState ? 10 : 17,
                            }}
                            onClick={this.onMapClick}
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
                                                `onclick="javascript:(${this.copyBalloonAddress})()">`,
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
                    </div>
                </div>
            </ClickOutside>
        );
    }
};

export default YandexMap;