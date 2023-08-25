import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

//type FetchPizzasArgs = Record<string, string>;

type FetchParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchParams>(
  "pizzas/fetchPizzasStatus",
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://64d24f20f8d60b174361d90f.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    );
    return data;
  }
);
type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
