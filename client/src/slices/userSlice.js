import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  lastName: "",
  identification: "",
  password: "",
  email: "",
  isActive: false,
  avatar: "",
  role: "",
  address: null,
  userTrucks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        email,
        name,
        lastName,
        identification,
        isActive,
        role,
        password,
      } = action.payload;

      state.email = email;
      state.name = name;
      state.lastName = lastName;
      state.identification = identification;
      state.isActive = isActive;
      state.role = role;
      state.password = password;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {
      console.log("getUserById action triggered with id:", action.payload);
    },
    updateUserByEmail: (state, action) => {
      const { updatedUserData } = action.payload;
      return {
        ...state,
        ...updatedUserData, 
      };
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, getUsers, getUserById, updateUserByEmail, deleteUser } = userSlice.actions;
export default userSlice.reducer;
