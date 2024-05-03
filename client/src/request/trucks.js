import { ENV } from "../utils/constants";

export class Truck {
    base_api = ENV.BASE_API;
    async newTrucK(data) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.NEWTRUCK}`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
          })
        return response;
    }

    async getListTrucks() {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.GETLISTTRUCKS}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        return response;
      }
}