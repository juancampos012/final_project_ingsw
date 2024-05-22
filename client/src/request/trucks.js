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

      async getListLicensePlates() {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.GETLISTLICENSEPLATES}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const licensePlates = await response.json();
        return licensePlates;
      }

      async getTruckByLicencePlate(licensePlate) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.GETTRUCKBYLICENCEPLATE}?licensePlate=${licensePlate}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        return response.json();
      }

      async deleteTruckById(id) {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.DELETETRUCKBYID}?id=${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
        });
        return response;
      }
}