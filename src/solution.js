const _ = require('underscore');
const $ =  require('jquery');

export const prepareData = (responseData, filterParams) => {
    let filterData = [];
    const checkMissionPayload =  (payloads) => {
        const result = payloads.map(payload => {
            const values = payload.customers.find(customer => customer.includes(filterParams.customerName))
            return !!values
        })
        return _.contains(result, true)
    }

    responseData
        .filter(data =>  data.launch_year === filterParams.year.toString() && checkMissionPayload(data.rocket.second_stage.payloads))
        .map(launch => {
            const payloads_count = launch.rocket.second_stage.payloads.length;
            return {
                ...launch,
                launch_date_utc : new Date(launch.launch_date_utc).toUTCString(),
                payloads_count
            }
        })
        .slice().sort((a, b) => b.flight_number - a.flight_number)
        .forEach( data => {
            const selectedParameters = {}
            Object.assign(selectedParameters, _.pick(data, ["flight_number", "mission_name", "payloads_count"]))
            filterData.push(selectedParameters);
        })
    return filterData
}
export const renderData = (filterData) => {
    $(document).ready(function () {
        const mainContainer = document.getElementById("out");
        const div = document.createElement("div");
        div.innerHTML = JSON.stringify(filterData);
        mainContainer.appendChild(div)
        console.log(filterData)
    })

}
