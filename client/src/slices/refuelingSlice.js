import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  quantity: 0,
  cost: 0,
  efficiency: 0,
  truckId: "",
};

export const refuelingSlice = createSlice({
  name: "refueling",
  initialState,
  reducers: {
    addRefueling: (state, action) => {
      const {
        quantity,
        cost,
        efficiency,
        truckId,
      } = action.payload;

      state.quantity = quantity;
      state.cost = cost;
      state.efficiency = efficiency;
      state.truckId = truckId;
    },
    getRefuelings: (state, action) => {
      state.refuelings = action.payload;
    },
    getRefuelingById: (state, action) => {
      console.log("getRefuelingById action triggered with id:", action.payload);
    },
    updateRefuelingById: (state, action) => {
      const { updatedRefuelingData } = action.payload;
      return {
        ...state,
        ...updatedRefuelingData, 
      };
    },
    deleteRefueling: (state, action) => {
      state.refuelings = state.refuelings.filter(refueling => refueling.id !== action.payload);
    },
  },
});

export const { addRefueling, getRefuelings, getRefuelingById, updateRefuelingById, deleteRefueling } = refuelingSlice.actions;
export default refuelingSlice.reducer;
