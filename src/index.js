import {prepareData, renderData} from './solution'

const filterParams = {
  year: 2018,
  customerName: 'NASA',
}

fetch('https://api.spacexdata.com/v3/launches/past')
    .then(response => response.json())
    .then(data => prepareData(filterParams, data))
    .then(filteredData => renderData(filteredData))
