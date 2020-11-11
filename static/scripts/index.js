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
        })
    })

const fetchGarageData = (fetchedGarage) => {
    return getData(fetchedGarage.staticDataUrl)
        .then(garage => {
            const garageData = garage.parkingFacilityInformation.accessPoints[0]
            if (garageData) {
                const paymentMethods = []
                garage.parkingFacilityInformation.paymentMethods.forEach(paymentMethod => {
                    paymentMethods.push(paymentMethod.method)
                })
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
                        'capacity': garage.parkingFacilityInformation.specifications[0].capacity ? garage.parkingFacilityInformation.specifications[0].capacity : null,
                        'payment': paymentMethods
                    }
                }
            }
        })
}