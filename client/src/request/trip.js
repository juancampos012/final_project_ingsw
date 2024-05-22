import { ENV } from "../utils/constants";

export class Trip {
    base_api = ENV.BASE_API;
    async newTrip(data) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.NEWTRIP}`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
          })
        return response;
    }

    async getListTrip(userId) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.GETLISTTRIP}?userId=${userId}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const trip = await response.json();
        return trip;
      }
}