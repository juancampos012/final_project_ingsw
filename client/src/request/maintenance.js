import { ENV } from "../utils/constants";

export class Maintenance {
    base_api = ENV.BASE_API;
    async newMaintenance(data) {
        const url = `${this.base_api}/${ENV.API_ROUTES_MAINTENANCE.NEWMAINTENANCE}`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
          })
        return response;
    }
}