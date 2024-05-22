import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import truckReducer from "./truckSlice";
    
export const store = configureStore({
  reducer: {
    user: userReducer,
    truck: truckReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});