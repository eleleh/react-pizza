import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-raiting",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  sort: {
    name: "beliebt",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
  },
});

export const selectFilterSort = (state: RootState) =>
  state.filter.sort.sortProperty;
export const selectFilter = (state: RootState) => state.filter;
export const { setCategoryId, setSort, setSearchValue, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
