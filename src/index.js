import {prepareData, renderData} from './solution'

const filterParams = {
  year: 2018,
  customerName: 'NASA',
}

fetch('https://api.spacexdata.com/v3/launches/past')
    .then(response => response.json())
    .then(data => prepareData(data, filterParams))
    .then(filteredData => {
      console.log(filteredData)
    })




// const submitRequest = () => {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ...task })
//   };
//   fetch(`${config.apiUrl}//tenant/user`, requestOptions)
//       .then(response => response.json())
//       .then(data => console.log(data));
// }