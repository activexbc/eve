import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategories: (state) => {
      state.categories = [];
    },
    updateCategory: (state, action) => {
      const { id, updatedCategory } = action.payload;
      const categoryIndex = state.categories.findIndex((cat) => cat.id === id);
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = updatedCategory;
      }
    },
  },
});

export const { createCategory, deleteCategories, updateCategory } =
  categoriesSlice.actions;
