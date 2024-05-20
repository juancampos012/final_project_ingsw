import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  type: "",
  date: "",
  cost: 0,
  truck: "",
};

export const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    addMaintenance: (state, action) => {
      const {
        type,
        date,
        cost,
        truck,
      } = action.payload;

      state.type = type;
      state.date = date;
      state.cost = cost;
      state.truck = truck;
    },
    getMaintenances: (state, action) => {
      state.maintenances = action.payload;
    },
    getMaintenanceById: (state, action) => {
      console.log("getMaintenanceById action triggered with id:", action.payload);
    },
    updateMaintenanceById: (state, action) => {
      const { updatedMaintenanceData } = action.payload;
      return {
        ...state,
        ...updatedMaintenanceData, 
      };
    },
    deleteMaintenance: (state, action) => {
      state.maintenances = state.maintenances.filter(maintenance => maintenance.id !== action.payload);
    },
  },
});

export const { addMaintenance, getMaintenances, getMaintenanceById, updateMaintenanceById, deleteMaintenance } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
