import React from 'react';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';

const YandexMap = () => {
    return (
        <Map
            state={{
                    center: [55.75, 37.57],
                    zoom: 17,
            }}
            width={900} height={620} 
        >
            
            <ZoomControl options={{ 
                position: {
                    left: 'auto',
                    right: 20,
                    top: 170
                }
            }} />
            <Placemark defaultGeometry={[55.75, 37.57]} />
        </Map>
    );
}

export default YandexMap