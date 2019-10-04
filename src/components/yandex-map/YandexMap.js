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

    constructor(props) {
        super(props);
        this.state = {
            isMapReady: false
        };
        this.mapContentRef = React.createRef();
    }

    componentDidMount() {
        this.watchMapLoading();
    }

    watchMapLoading = async () => {
        try {
            let mapLoaded = await waitUntil(() => {
                return this.mapContentRef.current.childElementCount > 0;
            }, 20000);
            this.setState({ isMapReady: mapLoaded });
        } catch {
            console.log("map waiting timed out");
            this.setState({ isMapReady: true });
        }
    }

    onMapClick = (event) => {
        console.log(event.get("coords"));
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