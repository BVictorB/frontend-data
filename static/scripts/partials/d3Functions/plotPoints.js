import { dataPoints, slider, sliderText, sidebar } from './main'
import { projection } from './d3HelperFunctions'
import { convertUnixStampToYear } from '../helperFunctions'

export const plotPoints = (pointData) => {
    renderGarageData(pointData.features)
    sliderEvent(pointData)
    resetEvent(pointData)
    document.querySelector('.loading').classList.add('loaded')
}

const renderGarageData = (pointData) => {
    const points = dataPoints.selectAll('circle').data(pointData)

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
        updatePointData(slider.node().value, pointData)
    })
    .on('change', () => {
        updatePointData(slider.node().value, pointData)
    })
}

const updatePointData = (year, pointData) => {
    const selectedYear = Number('20' + year)
    sliderText.text(selectedYear)
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