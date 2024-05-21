import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import truckReducer from "./truckSlice";
import refuelingReducer from "./refuelingSlice";
import tireReducer from "./tireSlice";
import tripReducer from "./tripSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    truck: truckReducer,
    refueling: refuelingReducer,
    tire: tireReducer,
    trip: tripReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
