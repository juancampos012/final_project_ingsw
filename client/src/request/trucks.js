import { ENV } from "../utils/constants";

export class Truck {
    base_api = ENV.BASE_API;
    async newTrucK(truckData) {
      try {
          const URL = `${this.base_api}/${ENV.API_ROUTES_TRUCK.NEWTRUCK}`;
          const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(truckData),
          };
          const response = await fetch(URL, params);
          return response;
      } catch (error) {
          console.error(error);
          throw error;
      }
  }

    async getListTrucks() {
        const url = `${this.base_api}/${ENV.API_ROUTES_TRUCK.GETLISTTRUCKS}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const trucks = await response.json();
        return trucks;
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