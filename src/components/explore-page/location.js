export const fetchUserLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                reject(error);
            },
            { enableHighAccuracy: true }
        );
    });
};

export const getUserLocation = async (ymaps) => {
    try {
        const coordinates= await fetchUserLocation();
        const result = await ymaps.geocode(coordinates);
        const geoObjectEnglish = result.geoObjects.get(0);
        const cityInEnglish = geoObjectEnglish.getLocalities();
        const geoObjectRussian = await reverseGeocodeHandler(coordinates, 'locality');

        if (geoObjectRussian) {
            const { name, description } = geoObjectRussian;
            return { 
                coordinates,
                localityName: name,
                localityDescription: description,
                cityInEnglish: cityInEnglish ? cityInEnglish[0] : "",
            };
        }
        
        console.log('could not determine user location');
        return null;

    } catch {
        return null;
    }
};

export const reverseGeocodeHandler = async (coords, kind) => {
    const apiKey = process.env.REACT_APP_YANDEX_API_KEY;
    let geoUrl = new URL("https://geocode-maps.yandex.ru/1.x");
    let params = {
        geocode: `${coords[1]}, ${coords[0]}`,
        kind: kind,
        format: "json",
        apikey: apiKey,
        results: 1
    };
    Object.keys(params).forEach(key => geoUrl.searchParams.append(key, params[key]))
    let geocodeResult = await fetch(geoUrl);
    let data = await geocodeResult.json();
    try {
        const location = data.response.GeoObjectCollection.featureMember[0].GeoObject;
        return location;
    } catch {
        return null;
    }
}