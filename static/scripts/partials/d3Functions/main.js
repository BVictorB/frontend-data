import { select } from 'd3'
import { createMap } from './createMap'

export const 
    svg = select('svg'),
    g = svg.append('g'),
    slider = select('.slider'),
    sliderText = select('.selected-year'),
    amsterdamGeoStreets = 'https://gist.githubusercontent.com/BVictorB/f0859579f276725bbdd27e01b8c73fab/raw/2d3caf5e08b24df850d79479201d518f505d4777/amsterdam.geojson',
    amsterdamGeoDistricts = 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN&THEMA=gebiedsindeling'

createMap(amsterdamGeoStreets, amsterdamGeoDistricts)