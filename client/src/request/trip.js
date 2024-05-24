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

    async updateTrip(data) {
      const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.UPDATETRIP}`;
      const response = await fetch(url,{
          method: 'PATCH',
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

      async getList() {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.GETLISTTRIP}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const trip = await response.json();
        return trip;
      }

    async getUserTruck(id) {
      const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.GETUSERTTRUCKBYID}?id=${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      const trip = await response.json();
      return trip;
    }

    async getsListByDate(data) {
      const url = `${this.base_api}/${ENV.API_ROUTES_TRIP.GETLISTBYDATE}`;
      const response = await fetch(url,{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {"content-type": "application/json"},
        })
      return response;
  }
}