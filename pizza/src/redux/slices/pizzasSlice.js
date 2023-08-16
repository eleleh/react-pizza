import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async ({sortBy, order, category, search, currentPage}) => {
    const { data } = await axios.get(
      `https://64d24f20f8d60b174361d90f.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
