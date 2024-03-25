import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  message: null,
  borrow:[],
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    requestActions: (state) => {
      state.loading = true;
    },
    successActions: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
      state.message = action.payload.message || null;
    },
    MyborrowSuccess:(state,action)=>{
      state.loading = false;
      state.borrow=action.payload;
    },
    failActions: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetActions: (state) => {
      state.isUpdated = false;
      state.isDeleted = false;
      state.message =  null;

    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  requestActions: updateProfileRequest,
  requestActions: updatePasswordRequest,
  requestActions: resetPasswordRequest,
  requestActions: updateUserRequest,
  requestActions: deleteUserRequest,
  requestActions: MyborrowRequest,
  requestActions: newborrowRequest,
  requestActions: newreturnRequest,

  successActions: updateProfileSuccess,
  successActions: updatePasswordSuccess,
  successActions: resetPasswordSuccess,
  successActions: updateUserSuccess,
  successActions: deleteUserSuccess,
  successActions: newborrowSuccess,
  successActions: newreturnSuccess,

  failActions: updateProfileFail,
  failActions: updatePasswordFail,
  failActions: resetPasswordFail,
  failActions: updateUserFail,
  failActions: deleteUserFail,
  failActions: MyborrowFail,
  failActions: newborrowFail,
  failActions: newreturnFail,

  resetActions: updateProfileReset,
  resetActions: updatePasswordReset,
  resetActions: updateUserReset,
  resetActions: deleteUserReset,
  resetActions: newborrowReset,
  resetActions: newreturnReset,
MyborrowSuccess,
  clearErrors,
} = profileSlice.actions;

export default profileSlice.reducer;
