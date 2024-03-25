import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  status:null,
  isLoading: false,
  error: null,
};

const bookslice = createSlice({
  name: "all_books",
  initialState,
  reducers: {
    all_books_request: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    all_books_success: (state, action) => {
      state.book = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    all_books_fail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bookdetails_request: (state) => {
      state.isLoading = true;
    },
    bookdetails_success: (state, action) => {
      state.book = action.payload.book;
      state.status = action.payload.status;
      state.isLoading = false;
      state.error = null;
    },
    bookdetail_fail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { all_books_request, all_books_success, all_books_fail,bookdetail_fail,bookdetails_request,bookdetails_success } =
  bookslice.actions;
export default bookslice.reducer;
