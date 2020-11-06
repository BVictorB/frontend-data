import { getData } from './partials/getData'
import { plotPoints } from './partials/d3Functions/plotPoints'

getData('https://npropendata.rdw.nl//parkingdata/v2')
    .then(fetchedGarages => {
        const garagePromises = []

        fetchedGarages.ParkingFacilities.forEach(fetchedGarage => {
            if (fetchedGarage.name && fetchedGarage.name.toLowerCase().includes('amsterdam')) {
                garagePromises.push(fetchGarageData(fetchedGarage))
            }
        })

        Promise.all(garagePromises).then(garageArray => {
            const filteredGarages = garageArray.filter(garage => garage ? true : false)
            const garageObject = { 'features': [] }
            filteredGarages.forEach(filteredGarage => {
                garageObject.features.push(filteredGarage)
            })
            plotPoints(garageObject)
            parkingGarages()
        })
    })

const fetchGarageData = (fetchedGarage) => {
    return getData(fetchedGarage.staticDataUrl)
        .then(garage => {
            const garageData = garage.parkingFacilityInformation.accessPoints[0]
            if (garageData) {
                 return {
                    'geometry': {
                        'type': 'Point', 
                        'coordinates': [
                            garageData.accessPointLocation[0].longitude, 
                            garageData.accessPointLocation[0].latitude
                        ]
                    }, 
                    'type': 'Feature', 
                    'properties': {
                        'name': garage.parkingFacilityInformation.description,
                        'openDate': garage.parkingFacilityInformation.validityStartOfPeriod,
                        'capacity': garage.parkingFacilityInformation.specifications.capacity
                    }
                }
            }
        })
}


const parkingGarages = () => {
    const title = document.querySelector('.m-sidebar h1')
    const info = document.querySelector('.m-sidebar p')
    const parkingGarages = document.querySelectorAll('.parking-garage')
    parkingGarages.forEach(parkingGarage => {
        parkingGarage.addEventListener('click', (e) => {
            title.innerHTML = e.target.dataset.name
            info.innerHTML = `Open sinds ${e.target.dataset.date}`
        })
    })
    // console.log(parkingGarages)
}