import { select } from 'd3'
import { createMap } from './createMap'

export const 
    svg = select('svg'),
    streets = svg.append('g').attr('class', 'streets'),
    districts = svg.append('g').attr('class', 'districts'),
    dataPoints = svg.append('g').attr('class', 'points'),
    slider = select('.slider'),
    sidebar = select('.m-sidebar'),
    sliderText = select('.selected-year'),
    amsterdamGeoStreets = 'https://gist.githubusercontent.com/BVictorB/f0859579f276725bbdd27e01b8c73fab/raw/2d3caf5e08b24df850d79479201d518f505d4777/amsterdam.geojson',
    amsterdamGeoDistricts = 'https://amsterdam-maps.bma-collective.com/embed/parkeren/deploy_data/tarieven.json'

createMap(amsterdamGeoStreets, amsterdamGeoDistricts)