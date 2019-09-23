import React from 'react';
import {    Map, 
            Placemark, 
            ZoomControl, 
            GeolocationControl, 
            ListBox, 
            ListBoxItem 
        } from 'react-yandex-maps';

const YandexMap = ({    mapCoords, mapAddress, startState, 
                        cityList, locationInEnglish, handleCityChoice }) => {

    const onMapClick = (event) => {
        console.log(event.get("coords"));
    }

    const detectLocation = (event) => {
        console.log(event.get("position"));
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
                modules={['geoObject.addon.hint']}
                geometry={mapCoords}
                properties={{
                    hintContent: mapAddress
                }}
                options={{
                    preset: 'islands#yellowDotIcon'
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
            <GeolocationControl onLocationChange={detectLocation}/>
        </Map>
    );
}

export default YandexMap