import { geoMercator, geoPath, json } from 'd3'

export const projection = geoMercator().scale(200000).center([4.895168,52.370216])
export const pathGenerator = geoPath().projection(projection)

export const getData = async (url) => {
    let data = await json(url)
    return data
}