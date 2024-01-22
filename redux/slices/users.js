import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUsers: (state) => {
      state.users = [];
    },
  },
});

export const { createUsers, deleteUsers } = usersSlice.actions;
