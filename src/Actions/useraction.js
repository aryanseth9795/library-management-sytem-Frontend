
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerStart,
  registerSuccess,
  loaduserStart,
  loaduserSuccess,
  loaduserFailure,
  forgetFail,
  forgetStart,
  forgetSuccess,
} from "../Store/Slices/userslices";
import {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  MyborrowFail,
  MyborrowRequest,
  MyborrowSuccess,
  newborrowFail,
  newborrowRequest,
  newborrowSuccess,
  newreturnRequest,newreturnFail,newreturnSuccess, resetPasswordSuccess, resetPasswordFail, resetPasswordRequest
} from "../Store/Slices/profileslice";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const config = { headers: { "Content-Type": "application/json", } }

    const  {data}  = await axios.post(
      "/api/v1/login",
      { email, password },config
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const registerUser = (myForm) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/register", myForm, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch(loaduserStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get("/api/v1/me", config);

    dispatch(loaduserSuccess(data.user));
  } catch (error) {
    if(error.response.data.message==="invalid token" || error.response.data.message==="jwt expired"){
      localStorage.setItem('token',"");
      // state.user=null;
    }
    dispatch(loaduserFailure(error.response.data.message));
  }
};

export const forgotPassword=(email)=>async(dispatch)=>{
  try {
    dispatch(forgetStart());
    const {data}=await axios.post('/api/v1//password/forget',{email});
  dispatch(forgetSuccess(data));
  } catch (error) {
    dispatch(forgetFail(error.response.data.message));
    
  }
}
export const ResetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: { "Content-Type": "application/json",  },
    };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};
export const updatePassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: { "Content-Type": "application/json", token: `${token}` },
    };
    const { data } = await axios.put(
      `/api/v1/me/password/update`,
      passwords,
      config
    );
    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
export const updateProfile = (token, formdata) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = {
      headers: { "Content-Type": "multipart/form-data", token: `${token}` },
    };
    const { data } = await axios.post(
      `/api/v1/me/updateprofile`,
      formdata,
      config
    );
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const Myborrowfun = (token, value) => async (dispatch) => {
  try {
    dispatch(MyborrowRequest());

    const config = {
      headers: { "Content-Type": "application/json", token: `${token}` },
    };
    const { data } = await axios.post("/api/v1//borrow/my", { value }, config);
    dispatch(MyborrowSuccess(data.borrow));
  } catch (error) {
    dispatch(MyborrowFail(error.response.data.message));
  }
};

export const newborrow = (token, id) => async (dispatch) => {
  try {
    dispatch(newborrowRequest());

    const config = {
      headers: { "Content-Type": "application/json", token: `${token}` },
    };
    const { data } = await axios.post(
      "/api/v1/borrow/new",
      { book_id: id },
      config
    );
    dispatch(newborrowSuccess(data));
  } catch (error) {
    dispatch(newborrowFail(error.response.data.message));
  }
};

export const newReturn = (token, id) => async (dispatch) => {
  try {
    dispatch(newreturnRequest());

    const config = {
      headers: { "Content-Type": "application/json", token: `${token}` },
    };
    const { data } = await axios.post(
      "/api/v1/borrow/newreturn",
      { id },
      config
    );
    dispatch(newreturnSuccess(data));
  } catch (error) {
    dispatch(newreturnFail(error.response.data.message));
  }
}