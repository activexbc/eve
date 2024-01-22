import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProducts: (state) => {
      state.products = [];
    },
  },
});

export const { createProducts, deleteProducts } = productSlice.actions;
