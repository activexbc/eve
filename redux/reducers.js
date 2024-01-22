import { combineReducers } from "@reduxjs/toolkit";
import { categoriesSlice } from "./slices/categories";
import { productSlice } from "./slices/products";
import { userSlice } from "./slices/user";
import { usersSlice } from "./slices/users";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  users: usersSlice.reducer,
  categories: categoriesSlice.reducer,
  products: productSlice.reducer,
});
