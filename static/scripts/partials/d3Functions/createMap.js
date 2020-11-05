import { zoom } from 'd3'
import { pathGenerator, getData } from './d3HelperFunctions'
import { g, svg } from './main'

export const createMap = async (amsterdamGeoStreets, amsterdamGeoDistricts) => {
    const amsterdamGeoData = await getData(amsterdamGeoStreets)
    const districtGeoData = await getData(amsterdamGeoDistricts)
    const filteredGeoData = amsterdamGeoData.features.filter(e => e.geometry && e.geometry.type !== 'Point' && e.geometry.type !== 'LineString')
    
    svg.call(zoom().on('zoom', (e) => {
        g.attr('transform', e.transform)
    }))

    g.selectAll('path')
        .data(districtGeoData.features)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', '#2b9348')
                .attr('stroke-width', '.1')
        .data(filteredGeoData)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', '#999999')
                .attr('stroke-width', '0.1')
}