import { g, slider, sliderText, sidebar } from './main'
import { projection } from './d3HelperFunctions'
import { convertUnixStampToYear } from '../helperFunctions'

export const plotPoints = (pointData) => {
    renderGarageData(pointData.features)
    sliderEvent(pointData)
    resetEvent(pointData)
}

const renderGarageData = (pointData) => {
    const points = g.selectAll('circle').data(pointData)

    points
        .attr("cx", (d) => { return projection(d.geometry.coordinates)[0] })
        .attr("cy", (d) => { return projection(d.geometry.coordinates)[1] })
        .attr('data-name', d => d.properties.name)
        .attr('data-capacity', d => d.properties.capacity ? d.properties.capacity : 'Onbekend')
        .attr('data-date', d => convertUnixStampToYear(d.properties.openDate))
    
    points.enter()
        .append('circle')
        .attr("cx", (d) => { return projection(d.geometry.coordinates)[0] })
        .attr("cy", (d) => { return projection(d.geometry.coordinates)[1] })
        .attr('class', 'parking-garage')
        .attr('data-name', d => d.properties.name)
        .attr('data-capacity', d => d.properties.capacity ? d.properties.capacity : 'Onbekend')
        .attr('data-date', d => convertUnixStampToYear(d.properties.openDate))
        .on('click', (d, i) => renderGarageInfo(i))

    points.exit()
        .remove()
}

const renderGarageInfo = (garageInfo) => {
    sidebar.selectAll('.name')
        .attr("id", "removablediv")
        .text(garageInfo.properties.name)
    sidebar.selectAll('.year')
        .attr("id", "removablediv")
        .text(`Year: ${convertUnixStampToYear(garageInfo.properties.openDate)}`)
    sidebar.selectAll('.capacity')
        .attr("id", "removablediv")
        .text(`Capacity: ${garageInfo.properties.capacity}`)
}

const sliderEvent = (pointData) => {
    slider
    .on('input', () => {
        const selectedYear = Number('20' + slider.node().value)
        sliderText.text(selectedYear)
        updatePointData(selectedYear, pointData)
    })
    .on('change', () => {
        const selectedYear = Number('20' + slider.node().value)
        sliderText.text(selectedYear)
        updatePointData(selectedYear, pointData)
    })
}

const updatePointData = (selectedYear, pointData) => {
    const filteredPointData = pointData.features.filter(e => e.properties && convertUnixStampToYear(e.properties.openDate) === selectedYear)
    renderGarageData(filteredPointData)
}

const resetEvent = (pointData) => {
    const reset = document.querySelector('.reset-button')

    reset.addEventListener('click', () => {
        sliderText.text('Use the slider to select a year')
        renderGarageData(pointData.features)
    })
}