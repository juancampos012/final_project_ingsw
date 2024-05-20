import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  brand: "",
  mileage: 0,
  position: 0,
  wear: 0.0,
  velocityIndex: 0,
  wetGrip: "",
  truckId: "",
};

export const tireSlice = createSlice({
  name: "tire",
  initialState,
  reducers: {
    addTire: (state, action) => {
      const {
        brand,
        mileage,
        position,
        wear,
        velocityIndex,
        wetGrip,
        truckId,
      } = action.payload;

      state.brand = brand;
      state.mileage = mileage;
      state.position = position;
      state.wear = wear;
      state.velocityIndex = velocityIndex;
      state.wetGrip = wetGrip;
      state.truckId = truckId;
    },
    getTires: (state, action) => {
      state.tires = action.payload;
    },
    getTireById: (state, action) => {
      console.log("getTireById action triggered with id:", action.payload);
    },
    updateTireById: (state, action) => {
      const { updatedTireData } = action.payload;
      return {
        ...state,
        ...updatedTireData, 
      };
    },
    deleteTire: (state, action) => {
      state.tires = state.tires.filter(tire => tire.id !== action.payload);
    },
  },
});

export const { addTire, getTires, getTireById, updateTireById, deleteTire } = tireSlice.actions;
export default tireSlice.reducer;
