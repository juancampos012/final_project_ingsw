import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  licensePlate: "",
  brand: "",
  model: "",
  year: "",
  mileage: 0,
  capacity: 0,
  actualStatus: "",
  tires: [],
  refueling: [],
  maintenances: [],
  userTrucks: [],
};

export const truckSlice = createSlice({
  name: "truck",
  initialState,
  reducers: {
    addTruck: (state, action) => {
      const {
        licensePlate,
        brand,
        model,
        year,
        mileage,
        capacity,
      } = action.payload;

      state.licensePlate = licensePlate;
      state.brand = brand;
      state.model = model;
      state.year = year;
      state.mileage = mileage;
      state.capacity = capacity;
    },
    getTrucks: (state, action) => {
      state.trucks = action.payload;
    },
    getTruckByLicencePlate: (state, action) => {
      console.log("getTruckByLicencePlate action triggered with licensePlate:", action.payload);
    },
    updateTruckByLicencePlate: (state, action) => {
      const { updatedTruckData } = action.payload;
      return {
        ...state,
        ...updatedTruckData, 
      };
    },
    deleteTruckByLicencePlate: (state, action) => {
      state.trucks = state.trucks.filter(truck => truck.licensePlate !== action.payload);
    },
  },
});

export const { addTruck, getTrucks, getTruckByLicencePlate, updateTruckByLicencePlate, deleteTruckByLicencePlate } = truckSlice.actions;
export default truckSlice.reducer;
