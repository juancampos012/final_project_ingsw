import { ENV } from "../utils/constants";

export class Trip {
    base_api = ENV.BASE_API;
    async newTire(data) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TIRE.NEWTIRE}`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
          })
        return response;
    }

    async getTireByTruckId(truckId, position) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TIRE.GETTIREBYTRUCKID}?truckId=${truckId}&position=${position}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        return response.json();
    }
}