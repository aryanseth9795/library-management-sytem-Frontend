// Admin Controls

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  new: null,
  Allbooks: [],
  allUsers: [],
  Borrowed: [],
  Request: [],
  process:null,
  isdeleted: null,
  message: null,
  isUpdated: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    allUsersfetchStart: (state) => {
      state.isLoading = true;
    },
    allUsersfetchSuccess: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
      state.error = null;
    },
    allUsersfetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    UserfetchStart: (state) => {
      state.isLoading = true;
    },
    UserfetchSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    UserfetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    UserdeleteStart: (state) => {
      state.isLoading = true;
    },
    UserdeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.isdeleted = action.payload;
      state.message = action.payload.message;
    },
    UserdeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetActions: (state) => {
      state.isUpdated = false;
      state.isdeleted = false;
      state.new = null;
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },

    // Books Sliice
    allBooksfetchStart: (state) => {
      state.isLoading = true;
    },
    allBooksfetchSuccess: (state, action) => {
      state.isLoading = false;
      state.Allbooks = action.payload.allbooks;
      state.error = null;
    },
    allBooksfetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    bookdeleteStart: (state) => {
      state.isLoading = true;
    },
    bookdeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.isdeleted = action.payload;
      state.message = action.payload.message;
    },
    bookdeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    newbookStart: (state) => {
      state.isLoading = true;
    },
    newbookSuccess: (state, action) => {
      state.isLoading = false;
      state.new = action.payload;
      state.message = action.payload.success;
    },
    newbookFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Borrow
    BorrowfetchStart: (state) => {
      state.isLoading = true;
    },
    BorrowfetchSuccess: (state, action) => {
      state.isLoading = false;
      state.Borrowed = action.payload;
      state.error = null;
    },
    BorrowfetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    RequestfetchStart: (state) => {
      state.isLoading = true;
    },
    RequestfetchSuccess: (state, action) => {
      state.isLoading = false;
      state.Request = action.payload;
      state.error = null;
    },
    RequestfetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    datafetchStart: (state) => {
      state.isLoading = true;
    },
    datafetchSuccess: (state, action) => {
      state.isLoading = false;
      state.process = action.payload.borrow;
      state.error = null;
    },
    datafetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    approveStart: (state) => {
      state.isLoading = true;
    },
    approveSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    approveFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateadminStart: (state) => {
      state.isLoading = true;
    },
    updateadminSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    updateadminFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  allUsersfetchFailure,
  allUsersfetchSuccess,
  allUsersfetchStart,
  UserfetchStart,
  UserfetchSuccess,
  UserfetchFailure,
  UserdeleteFailure,
  UserdeleteStart,
  UserdeleteSuccess,
  resetActions,
  allBooksfetchFailure,
  allBooksfetchStart,
  allBooksfetchSuccess,
  bookdeleteFailure,
  bookdeleteStart,
  bookdeleteSuccess,
  newbookStart,
  newbookSuccess,
  newbookFailure,
  BorrowfetchStart,
  BorrowfetchFailure,
  BorrowfetchSuccess,
  RequestfetchFailure,
  RequestfetchStart,
  RequestfetchSuccess,datafetchFailure,datafetchStart,datafetchSuccess,approveFailure,approveStart,approveSuccess,updateadminFailure,updateadminStart,updateadminSuccess,
  clearErrors,
} = adminSlice.actions;
export default adminSlice.reducer;
