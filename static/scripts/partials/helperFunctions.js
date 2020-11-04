export const roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100
}

export const filterDataFromKey = (data, key) => {
    return data.map(result => result[key])
}

export const formatGeoData = (geoData, areaDescription, areaID) => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [geoData.longitude, geoData.latitude]
        },
        properties: {
            name: areaDescription,
            areaid: areaID
        }
    }
}