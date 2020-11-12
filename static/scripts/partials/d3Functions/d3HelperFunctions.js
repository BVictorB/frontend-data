import { geoMercator, geoPath, json } from 'd3'

export const projection = geoMercator().scale(200000).center([4.895168,52.370216])
export const pathGenerator = geoPath().projection(projection)

export const getData = async (url) => {
    let data = await json(url)
    return data
}

export const formatDistricts = (districtData) => {
    const districts = districtData.map((district) => {
        const districts = { 'geometry': {}, 'type': 'Feature', 'properties': {}}
        districts.geometry.type = district.location.type
        districts.geometry.coordinates = district.location.coordinates
        districts.properties.description = district.description
        districts.properties.tariffs = district.tarieven
        return districts
    })
    return districts
}