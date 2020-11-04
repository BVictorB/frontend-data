import { filterDataFromKey } from './helperFunctions'

export const getData = (url, key) => {
    return fetchData(url).then(data => {
        if (key) {
            return filterDataFromKey(data, key)
        } else {
            return data
        }
    })
}

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}