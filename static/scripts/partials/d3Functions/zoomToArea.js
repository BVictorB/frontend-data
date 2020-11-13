import { pathGenerator } from './d3HelperFunctions'
import { streets, districts, dataPoints, areaPrice, areaTitle } from './main'

const width = 960
const height = 500
let centered

export const zoomToArea = (i) => {
    let x, y, zoomLevel

    if (i && centered !== i) {
        const centroid = pathGenerator.centroid(i.geometry)
        x = centroid[0]
        y = centroid[1]
        zoomLevel = 5
        centered = i
        areaTitle
            .text('Area price')
        areaPrice
            .text(`€${i.properties.tariffs[0] ? Object.keys(i.properties.tariffs[0]).toString() : null} per hour`)
    } else {
        x = width / 2
        y = height / 2
        zoomLevel = 1
        centered = null
        areaTitle
            .text('Select an area')
        areaPrice
            .text('')
    }

    // districts.transition()
    //     .duration(500)
    //     .attr('transform', `translate(${width},${height})scale(${zoomLevel})translate(${-x},${-y})`)

    // streets.transition()
    //     .duration(500)
    //     .attr('transform', `translate(${width},${height})scale(${zoomLevel})translate(${-x},${-y})`)

    // dataPoints.transition()
    //     .duration(500)
    //     .attr('transform', `translate(${width},${height})scale(${zoomLevel})translate(${-x},${-y})`)
}