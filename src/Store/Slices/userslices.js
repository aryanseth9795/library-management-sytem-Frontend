// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated:false,
  token:null,
  forget:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.token=action.payload.token;
      localStorage.setItem('token',action.payload.token)
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.token=null;
      localStorage.setItem('token','')
    },
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      state.token=action.payload.token;
      localStorage.setItem('token',action.payload.token)
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loaduserStart: (state) => {
      state.isLoading = true;
    },
    loaduserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token=localStorage.getItem('token');
      state.error = null;
    },
    loaduserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      
    },

    forgetStart:(state)=>{
      state.isLoading = true;

    },
    forgetSuccess:(state,action)=>{
      state.isLoading = false;
      state.forget = action.payload.message;
    },
    forgetFail:(state,action)=>{
      state.isLoading = false;
      state.forget = null;
      state.error = action.payload;
    },
    clearerrors:(state)=>{
      state.error=null;
    },
    reset:(state)=>{
      state.error=null;
       state.forget=null;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,registerStart,registerSuccess,registerFailure,loaduserFailure,loaduserStart,loaduserSuccess,proupdateFailure,proupdateStart,proupdateSuccess,forgetFail,forgetStart,forgetSuccess,reset,clearerrors } = authSlice.actions;
export default authSlice.reducer;
