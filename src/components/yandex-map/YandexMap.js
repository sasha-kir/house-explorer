import React from 'react';
import { Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';

const YandexMap = ({ mapCoords, startState }) => {

    const onMapClick = (event) => {
        console.log(event.get("coords"));
    }

    const detectLocation = (event) => {
        console.log(event.get("position"))
    }
    
    return (
        <Map
            state={{
                    center: mapCoords,
                    zoom: startState ? 10 : 17,
            }}
            onClick={onMapClick}
            width={900} height={620} 
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
                geometry={mapCoords}
                options={{
                    preset: 'islands#yellowDotIcon'
                }}   
            />
            <GeolocationControl onLocationChange={detectLocation}/>
        </Map>
    );
}

export default YandexMap