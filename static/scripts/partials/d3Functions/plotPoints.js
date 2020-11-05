import { g } from './main'
import { projection } from './d3HelperFunctions'

export const plotPoints = (pointData) => {
    g.selectAll('circle').data(pointData.features)
        .enter().append('circle')
            .attr("cx", function(d){ return projection(d.geometry.coordinates)[0] })
            .attr("cy", function(d){ return projection(d.geometry.coordinates)[1] })
            .attr('r', .5)
            .attr('fill', '#2b9348')
            .append('title')
            .text(d => d.properties.name)
}