import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  originPlace: "",
  destinationPlace: "",
  distance: 0.0,
  time: 0.0,
  completed: false,
  userTruckId: "",
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addTrip: (state, action) => {
      const {
        originPlace,
        destinationPlace,
        distance,
        time,
        userTruckId,
      } = action.payload;

      state.originPlace = originPlace;
      state.destinationPlace = destinationPlace;
      state.distance = distance;
      state.time = time;
      state.userTruckId = userTruckId;
    },
    getTrips: (state, action) => {
      state.trips = action.payload;
    },
    getTripById: (state, action) => {
      console.log("getTripById action triggered with id:", action.payload);
    },
    updateTrip: (state, action) => {
      const { updatedTripData } = action.payload;
      return {
        ...state,
        ...updatedTripData, 
      };
    },
    deleteTrip: (state, action) => {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    },
  },
});

export const { addTrip, getTrips, getTripById, updateTrip, deleteTrip } = tripSlice.actions;
export default tripSlice.reducer;
