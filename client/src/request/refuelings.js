import { ENV } from "../utils/constants";

export class Refueling {
    base_api = ENV.BASE_API;
    async newRefueling(data) {
        const url = `${this.base_api}/${ENV.API_ROUTES_REFUELING.NEWREFUELING}`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
          })
        return response;
    }
}