

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/userslices';
import axios from 'axios';
import booksReducers from './Slices/booksslice';
import adminReducers from './Slices/adminslice';
import profileReducers from './Slices/profileslice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    all_books:booksReducers,
    admin:adminReducers,
    profile:profileReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { axios },
      },
    })
});

export default store;

