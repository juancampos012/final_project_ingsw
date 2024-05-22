import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  lastName: "",
  identification: "",
  password: "",
  email: "",
  isActive: false,
  avatar: "",
  role: "",
  department: "",
  municipality: "",
  nomenclature: "",
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        name,
        lastName,
        identification,
        password,
        email,
        isActive,
        avatar,
        role,
        department,
        municipality,
        nomenclature,
      } = action.payload;
      console.log(action.payload);

      state.email = email;
      state.name = name;
      state.lastName = lastName;
      state.avatar = avatar;
      state.identification = identification;
      state.password = password;
      state.isActive = isActive;
      state.role = role;
      state.department = department;
      state.municipality = municipality;
      state.nomenclature = nomenclature;
    },

    getUsers: (state, action) => {
      state.users = action.payload;
    },

    getUserById: (state, action) => {
      console.log("getUserById action triggered with id:", action.payload);
    },

    editUserById: (state, action) => {
      const { updatedUserData } = action.payload;
      return {
        ...state,
        ...updatedUserData,
      };
    },

    deleteUserById: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },

    updateUsersOrder: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  addUser,
  getUserById,
  editUserById,
  deleteUserById,
  getUsers,
  updateUsersOrder
} = userSlice.actions;
export default userSlice.reducer;
