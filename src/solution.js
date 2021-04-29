import _ from "underscore";
import $ from "jquery";

export const prepareData = (filterParams,responseData) => {
    let filterData = [];
    const checkMissionPayload =  (payloads) => {
        const result = payloads.map(payload => {
            const customers = payload.customers.find(customer => customer.includes(filterParams.customerName))
            return !!customers
        })
        return _.contains(result, true)
    }

    responseData
        .filter(data =>  data.launch_year === filterParams.year.toString() && checkMissionPayload(data.rocket.second_stage.payloads))
        .map(launch => {
            const payloads_count = launch.rocket.second_stage.payloads.length;
            return {...launch, launch_date_utc : new Date(launch.launch_date_utc).toUTCString(), payloads_count}
        })
        .slice().sort((a, b) => b.payloads_count - a.payloads_count || new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc).getTime())
        .forEach( data => filterData.push({..._.pick(data, ["flight_number", "mission_name", "payloads_count"])}));
    return filterData
}
export const renderData = (filterData) => {
    $(document).ready(function () {
        const mainContainer = document.getElementById("out");
        let expected = [];
            filterData.forEach(mission => {
                const data =
            `
            {
              flight_number: ${mission.flight_number},
              mission_name: ${mission.mission_name},
              payloads_count: ${mission.payloads_count}
            }`
                expected.push(data)
            });

        mainContainer.innerHTML = `
        [
            ${expected}
        ]`;
    })

}
