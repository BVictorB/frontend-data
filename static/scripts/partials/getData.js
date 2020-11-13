import { filterDataFromKey } from './helperFunctions'

const proxy = 'https://cors-anywhere.herokuapp.com/'

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
    const response = await fetch(proxy + url)
    const data = await response.json()
    return data
}