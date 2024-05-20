import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  department: "",
  municipality: "",
  nomenclature: "",
  userId: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const {
        department,
        municipality,
        nomenclature,
        userId,
      } = action.payload;

      state.department = department;
      state.municipality = municipality;
      state.nomenclature = nomenclature;
      state.userId = userId;
    },
    getAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    getAddressById: (state, action) => {
      console.log("getAddressById action triggered with id:", action.payload);
    },
    updateAddressById: (state, action) => {
      const { updatedAddressData } = action.payload;
      return {
        ...state,
        ...updatedAddressData, 
      };
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(address => address.id !== action.payload);
    },
  },
});

export const { addAddress, getAddresses, getAddressById, updateAddressById, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
