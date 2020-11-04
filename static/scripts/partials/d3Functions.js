import { select, json, geoPath, geoMercator, zoom } from 'd3'
import { feature } from 'topojson'

const svg = select('svg')
const projection = geoMercator().scale(50000).center([4.895168,52.370216])
const pathGenerator = geoPath().projection(projection)
const main = svg.append('g')
const districts = svg.append('g')
const amsterdamGeo = 'https://gist.githubusercontent.com/BVictorB/f0859579f276725bbdd27e01b8c73fab/raw/2d3caf5e08b24df850d79479201d518f505d4777/amsterdam.geojson'
const amsterdamStadsdelen = 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN&THEMA=gebiedsindeling'

async function createMap() {
    const geoData = await getData(amsterdamGeo)
    const stadsdelen = await getData(amsterdamStadsdelen)
    console.log(geoData.features)
    const filteredGeoData = geoData.features.filter(e => e.geometry && e.geometry.type !== 'Point')
    console.log(filteredGeoData)
    svg.call(zoom().on('zoom', (e) => {
        main.attr('transform', e.transform)
        districts.attr('transform', e.transform)
    }))

    main.selectAll('path')
        .data(filteredGeoData)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', '#999999')
                .attr('stroke-width', '0.1')
    
    districts.selectAll('path')
        .data(stadsdelen.features)
            .enter()
                .append('path')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', '#2b9348')
                .attr('stroke-width', '.1')

}

export const drawMap = (pointData) => {
        main.selectAll('circle').data(pointData.features)
            .enter().append('circle')
                .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
                .attr('r', .5)
                .attr('fill', '#2b9348')
                .append('title')
                .text(d => d.properties.name)
}

async function getData(url) {
    let data = await json(url)
    return data
}

createMap()