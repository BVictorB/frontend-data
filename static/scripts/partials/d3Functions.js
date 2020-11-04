import { select, json, geoPath, geoMercator, zoom } from 'd3'
import { feature } from 'topojson'

const svg = select('svg')
const projection = geoMercator().scale(8000).center([5.116667,52.70000])
const pathGenerator = geoPath().projection(projection)
const g = svg.append('g')

json('https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson').then(geoData => {
    const gemeentes = feature(geoData, geoData.objects.gemeente_2020)
    svg.call(zoom().on('zoom', (e) => {
        g.attr('transform', e.transform)
    }))

    g.selectAll('path').data(gemeentes.features)
        .enter().append('path')
            .attr('d', pathGenerator)
            .append('title')
            .text(d => `${d.properties.statnaam}, ID:${d.id}`)
})

export const drawMap = (pointData) => {
        g.selectAll('circle').data(pointData.features)
            .enter().append('circle')
                .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
                .attr('r', 1)
                .append('title')
                .text(d => d.properties.name)
}