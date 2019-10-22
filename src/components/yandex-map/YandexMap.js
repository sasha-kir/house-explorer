import React, { Component } from 'react';
import {    Map, 
            Placemark, 
            ZoomControl, 
            GeolocationControl, 
            ListBox, 
            ListBoxItem 
        } from 'react-yandex-maps';

import * as waitUntil from 'async-wait-until';

import Spinner from '../spinner/Spinner';

import './YandexMap.sass';

class YandexMap extends Component { 
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isMapReady: false,
            showBalloon: false,
            clickCoords: this.props.mapCoords,
            clickAddress: ""
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
        this.setState({ 
            clickAddress: data.response.GeoObjectCollection.featureMember[0].GeoObject.name,
            clickCoords,
            showBalloon: true
        });
    }

    detectLocation = (event) => {
        console.log(event.get("position"));
    }

    render() {
        const { mapCoords, mapAddress, startState, 
                cityList, locationInEnglish, handleCityChoice } = this.props;

        return (
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
                            instanceRef={ ref => { if (ref && this.state.showBalloon) return ref.balloon.open() } } 
                            key={2}
                            geometry={this.state.clickCoords}
                            modules={["geoObject.addon.balloon"]}
                            onBalloonClose={() => { this.setState({showBalloon: false}) }}
                            properties={{
                                balloonContent: this.state.clickAddress,
                            }}
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
        );
    }
};

export default YandexMap;