import React from 'react';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';

const YandexMap = ({ mapCoords, startState }) => {

    const onMapClick = (event) => {
        console.log(event.get("coords"));
    }

    return (
        <Map
            onClick={onMapClick}
            state={{
                    center: mapCoords,
                    zoom: startState ? 10 : 17,
            }}
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
        </Map>
    );
}

export default YandexMap