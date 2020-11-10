import { g, slider, sliderText } from './main'
import { projection } from './d3HelperFunctions'
import { convertUnixDate } from '../helperFunctions'
import { select } from 'd3'

export const plotPoints = (pointData) => {
    const filteredPointData = pointData.features.filter(e => e.properties && e.properties.openDate > 1388534400)
    // const date = new Date(filteredPointData[0].properties.openDate * 1000)
    // console.log(date.getFullYear())
    plotGarageData(filteredPointData)
    parkingGarages()

    // Write getYears function

    slider
        .on('input', () => {
            const number = '20' + slider.node().value
            sliderText.text(number)
            updatePointData(number)
        })
        .on('change', () => {
            const number = '20' + slider.node().value
            sliderText.text(number)
            updatePointData(number)
        })

    const updatePointData = (selectedYear) => {
        const filteredPointData = pointData.features.filter(e => e.properties && (new Date(e.properties.openDate * 1000)).getFullYear() === Number(selectedYear))
        const olderPointData = pointData.features.filter(e => e.properties && (new Date(e.properties.openDate * 1000)).getFullYear() < Number(selectedYear))
        g.selectAll('circle').remove()
        plotGarageData(filteredPointData)
        plotOldGarageData(olderPointData)
    }
}

const parkingGarages = () => {
    const title = document.querySelector('.m-sidebar h1')
    const info = document.querySelector('.m-sidebar p')
    const parkingGarages = document.querySelectorAll('.parking-garage')
    parkingGarages.forEach(parkingGarage => {
        parkingGarage.addEventListener('click', (e) => {
            title.innerHTML = e.target.dataset.name
            info.innerHTML = `Open sinds ${e.target.dataset.date}`
        })
    })
}

const plotGarageData = (filteredPointData) => {
    g.selectAll('circle').data(filteredPointData)
        .enter().append('circle')
            .attr("cx", (d) => { return projection(d.geometry.coordinates)[0] })
            .attr("cy", (d) => { return projection(d.geometry.coordinates)[1] })
            .attr('r', .5)
            .attr('class', 'parking-garage')
            .attr('data-name', d => d.properties.name)
            .attr('data-capacity', d => d.properties.capacity)
            .attr('data-date', d => convertUnixDate(d.properties.openDate))
    parkingGarages()
}

const plotOldGarageData = (olderPointData) => {
    g.selectAll('circle').data(olderPointData)
        .enter().append('circle')
            .attr("cx", (d) => { return projection(d.geometry.coordinates)[0] })
            .attr("cy", (d) => { return projection(d.geometry.coordinates)[1] })
            .attr('r', .5)
            .attr('class', 'parking-garage old-parking-garage')
            .attr('data-name', d => d.properties.name)
            .attr('data-capacity', d => d.properties.capacity)
            .attr('data-date', d => convertUnixDate(d.properties.openDate))
    parkingGarages()
}