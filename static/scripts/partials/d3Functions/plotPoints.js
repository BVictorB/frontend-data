import { g } from './main'
import { projection } from './d3HelperFunctions'
import { convertUnixDate } from '../helperFunctions'

export const plotPoints = (pointData) => {
    const filteredPointData = pointData.features.filter(e => e.properties && e.properties.openDate > 1388534400)
    g.selectAll('circle').data(filteredPointData)
        .enter().append('circle')
            .attr("cx", (d) => { return projection(d.geometry.coordinates)[0] })
            .attr("cy", (d) => { return projection(d.geometry.coordinates)[1] })
            .attr('r', .5)
            .attr('class', 'parking-garage')
            .attr('data-name', d => d.properties.name)
            .attr('data-capacity', d => d.properties.capacity)
            .attr('data-date', d => convertUnixDate(d.properties.openDate))
}