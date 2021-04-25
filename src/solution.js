const _ = require('underscore')

export const prepareData = (responseData, filterParams) => {
    let filterData = [];
   responseData
        .filter(data => data.rocket.second_stage.payloads[0].customers.find( customer => customer.includes(filterParams.customerName)) && data.launch_year === filterParams.year.toString())
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
export const renderData = () => {}
