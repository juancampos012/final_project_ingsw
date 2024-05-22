import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  licensePlate: "",
  brand: "",
  model: "",
  year: "",
  mileage: 0,
  capacity: 0,
  actualStatus: "En operacion",
  trucks: [],
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
        actualStatus,
        capacity,
      } = action.payload;
      state.licensePlate = licensePlate;
      state.brand = brand;
      state.model = model;
      state.year = year;
      state.actualStatus= actualStatus;
      state.mileage = mileage;
      state.capacity = capacity;
      state.trucks.push({
        licensePlate,
        brand,
        model,
        year,
        mileage,
        actualStatus,
        capacity,
      });
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

    deleteTruckById: (state, action) => {
      state.trucks = state.trucks.filter(truck => truck.id !== action.payload);
    },

    updateTrucksOrder: (state, action) => {
      state.trucks = action.payload;
    },
  },
});

export const { addTruck, getTrucks, getTruckByLicencePlate, updateTruckByLicencePlate, deleteTruckById, updateTrucksOrder } = truckSlice.actions;
export default truckSlice.reducer;
