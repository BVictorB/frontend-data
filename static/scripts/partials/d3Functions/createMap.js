import { zoom } from 'd3'
import { getData, formatDistricts, pathGenerator } from './d3HelperFunctions'
import { streets, svg, districts, dataPoints } from './main'
import { zoomToArea } from './zoomToArea'

export const createMap = async (amsterdamGeoStreets, amsterdamGeoDistricts) => {
    const amsterdamGeoData = await getData(amsterdamGeoStreets)
    const districtGeoData = await getData(amsterdamGeoDistricts)

    const filteredGeoData = amsterdamGeoData.features.filter(e => e.geometry && e.geometry.type !== 'Point' && e.geometry.type !== 'LineString')
    const districtGeoDataFiltered = formatDistricts(Object.entries(districtGeoData).map(([key, value]) => value))

    svg.call(zoom().on('zoom', (e) => {
        streets.attr('transform', e.transform)
        districts.attr('transform', e.transform)
        dataPoints.attr('transform', e.transform)
    }))

    streets.selectAll('path')
        .data(filteredGeoData)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('class', 'geo-path')

    districts.selectAll('path')
        .data(districtGeoDataFiltered)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('class', 'district-path')
                // .on('click', (d, i) => console.log(i.properties.tariffs[0] ? Object.keys(i.properties.tariffs[0]).toString() : null))
                .on('click', (d, i) => zoomToArea(i))
        
}