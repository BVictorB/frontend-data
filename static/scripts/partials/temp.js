// Ignore this file, this is just to store some functions that i might need later


// getData('https://opendata.rdw.nl/resource/534e-5vdg.json?$limit=10000').then(result => {
//     const pricePerHour = []
//     result.forEach(item => {
//         pricePerHour.push({
//             areamanagerid: item.areamanagerid,
//             price: roundToTwoDecimals(item.amountfarepart / item.stepsizefarepart * 60)
//         })
//     })
//     // console.log(filterDataFromKey(result, 'areamanagerid'))
//     console.log(pricePerHour)
// })

// getData('https://opendata.rdw.nl/resource/t5pc-eb34.json').then(result => {
//     let geoLocations = []
//     result.forEach(geoData => {
//         geoLocations.push(formatGeoData(geoData.location, geoData.areadesc, geoData.areaid))
//     })
//     geoLocations = geoLocations.reduce((a, c) => (a[c.properties.areaid] = c, a), {})
//     addPrice(geoLocations)
// })

// const addPrice = (geoLocations) => {
//     getData('https://opendata.rdw.nl/resource/mz4f-59fw.json?$limit=5500').then(result => {
//         let test = 0
//         result.forEach((areaID, index) => {
//             getData(`https://npropendata.rdw.nl//parkingdata/v2/static/${areaID.uuid}`)
//                 .then(UUID => {
//                     if (UUID.parkingFacilityInformation.tariffs[0].intervalRates[0]) {
//                         const prices = UUID.parkingFacilityInformation.tariffs[0].intervalRates[0]
//                         const price = roundToTwoDecimals(prices.charge / prices.chargePeriod * 60)
//                         geoLocations[areaID.areaid].price = price
//                         console.log(geoLocations[areaID.areaid])
//                         test++
//                         console.log(test)
//                     } else {
//                         console.log('No price information')
//                     }
//                 })
//                 .catch(err => {
//                     console.log()
//                 })
//         })
//     })
// }

// let myObjects = [{"name":"teststring Amsterdam", "value":0}, {"name":"b Amsterdam", "value":1},{"name":"c sadsadsa", "value":2}];

// myObjects.forEach(obj => {
//     if (obj.name.includes('Amsterdam')) {
//         const found = obj.value
//         console.log(found)
//     }
// })

// BACKEND NODEJS CODE FOR CREATING A NEW JSON?

// const fetchData = async (url) => {
//     const response = await fetch(url)
//     const data = await response.json()
//     return data
//   }
  
// fetchData('https://npropendata.rdw.nl//parkingdata/v2')
//     .then(fetchedGarages => {
//         const garagePromises = []
//         fetchedGarages.ParkingFacilities.forEach((fetchedGarage, index) => {
//           if (index < fetchedGarages.ParkingFacilities.length) {
//             setTimeout(function(){
//               console.log(index);
//               garagePromises.push(fetchGarageData(fetchedGarage))
//             }, index * 100);
//           } else if (index == fetchedGarages.ParkingFacilities.length){
//             setTimeout(function(){
//               placeData(garagePromises)
//             }, index * 100);
//           }
//         })
//     })

// const fetchGarageData = (fetchedGarage) => {
//     return fetchData(fetchedGarage.staticDataUrl)
//         .then(garage => {
//           return garage
//         })
//         .catch(err => {
//           console.log(`Error: ${err}`)
//         })
// }

// const placeData = (garagePromises) => {
//   Promise.all(garagePromises).then(garageArray => {
//     const filteredGarages = garageArray.filter(garage => garage ? true : false)
//     const garageObject = []
//     filteredGarages.forEach(filteredGarage => {
//         garageObject.push(filteredGarage)
//     })
//     fs.writeFileSync('./file.json', JSON.stringify(garageObject, null, 4))
//   })
// }