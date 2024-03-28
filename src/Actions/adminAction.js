// Admin ----->Users controls
import axios from "axios";
import {
  UserfetchFailure,
  UserfetchStart,
  UserfetchSuccess,
  allUsersfetchFailure,
  allUsersfetchStart,
  allUsersfetchSuccess,
  UserdeleteStart,
  UserdeleteFailure,
  UserdeleteSuccess,
  allBooksfetchStart,
  allBooksfetchSuccess,
  allBooksfetchFailure,
  bookdeleteStart,
  bookdeleteSuccess,
  bookdeleteFailure,
  newbookStart,
  newbookSuccess,
  newbookFailure,
  BorrowfetchStart,
  BorrowfetchSuccess,
  BorrowfetchFailure,
  RequestfetchStart,
  RequestfetchFailure,
  RequestfetchSuccess,
  datafetchSuccess,
  datafetchFailure,
  datafetchStart,
  approveStart,
  approveSuccess,
  approveFailure,
  updateadminStart,
  updateadminSuccess,
  updateadminFailure,
} from "../Store/Slices/adminslice";

// get All Users
export const getAllUsers = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
  };
  try {
    dispatch(allUsersfetchStart());
    const { data } = await axios.get(`/api/v1/admin/users`, config);

    dispatch(allUsersfetchSuccess(data.user));
  } catch (error) {
    dispatch(allUsersfetchFailure(error.response.data.message));
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(UserfetchStart);
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch(UserfetchSuccess(data));
  } catch (error) {
    dispatch(UserfetchFailure);
  }
};

// Update User
// export const updateUser = (id, userData) => async (dispatch) => {
//   try {
//     dispatch();

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/admin/user/${id}`,
//       userData,
//       config
//     );

//     dispatch();
//   } catch (error) {
//     dispatch();
//   }
// };

// Delete User
export const deleteUser = (token, id) => async (dispatch) => {
  try {
    dispatch(UserdeleteStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`, config);

    dispatch(UserdeleteSuccess(data));
  } catch (error) {
    dispatch(UserdeleteFailure(error.response.data.message));
  }
};

// Admin ---> Books control

// Get All books For Admin
export const getAdminbook = (token) => async (dispatch) => {
  try {
    dispatch(allBooksfetchStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get("/api/v1/admin/books", config);

    dispatch(allBooksfetchSuccess(data));
  } catch (error) {
    dispatch(allBooksfetchFailure(error.response.data.message));
  }
};

// Create book
export const createbook = (token, bookData) => async (dispatch) => {
  try {
    dispatch(newbookStart());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `${token}`,
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/books/new",
      bookData,
      config
    );

    dispatch(newbookSuccess(data));
  } catch (error) {
    dispatch(newbookFailure(error.response.data.message));
  }
};

// Update book
// export const updatebook = (id, bookData) => async (dispatch) => {
//   try {
//     dispatch();

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/book/${id}`,
//       bookData,
//       config
//     );

//     dispatch();
//   } catch (error) {
//     dispatch();
//   }
// };

// Delete book
export const deletebook = (token, id) => async (dispatch) => {
  try {
    dispatch(bookdeleteStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/books/${id}`, config);

    dispatch(bookdeleteSuccess(data));
  } catch (error) {
    dispatch(bookdeleteFailure(error.response.data.message));
  }
};

// Borrower Panel

//Borrow/ Return List fetch
export const BorrowListReq = (token, value) => async (dispatch) => {
  try {
    dispatch(RequestfetchStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/v1/borrow/admin/allreq",
      { value },
      config
    );

    dispatch(RequestfetchSuccess(data.borrow));
  } catch (error) {
    dispatch(RequestfetchFailure(error.response.data.message));
  }
};

//Borrowed List fetch
export const BorrowList = (token) => async (dispatch) => {
  try {
    dispatch(BorrowfetchStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get(
      "/api/v1/borrow/admin/allborrowed",
      config
    );

    dispatch(BorrowfetchSuccess(data.borrow));
  } catch (error) {
    dispatch(BorrowfetchFailure(error.response.data.message));
  }
};

export const updaterequest = (token, id) => async (dispatch) => {
  try {
    dispatch(datafetchStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/borrow/admin/id/${id}`, config);
    dispatch(datafetchSuccess(data));
  } catch (error) {
    dispatch(datafetchFailure(error.response.data.message));
  }
};

export const approve = (token, id) => async (dispatch) => {
  try {
    dispatch(approveStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/v1/borrow/admin/update",
      { id },
      config
    );
    dispatch(approveSuccess(data));
  } catch (error) {
    dispatch(approveFailure(error.response.data.message));
  }
};
export const reject = (token, id) => async (dispatch) => {
  try {
    dispatch(approveStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/v1/borrow/admin/update/reject",
      { id },
      config
    );
    dispatch(approveSuccess(data));
  } catch (error) {
    dispatch(approveFailure(error.response.data.message));
  }
};


export const approveReturn = (token, id) => async (dispatch) => {
  try {
    dispatch(approveStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/v1//borrow/admin/return",
      { id },
      config
    );
    dispatch(approveSuccess(data));
  } catch (error) {
    dispatch(approveFailure(error.response.data.message));
  }
};

export const useradmin=(token,id)=>async(dispatch)=>{
  try {
    dispatch(UserfetchStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/v1/admin/user/${id}`,
      config
    );
    dispatch(UserfetchSuccess(data.user));
  } catch (error) {
    dispatch(UserfetchFailure(error.response.data.message));
  }
}
export const updatetoadmin=(token,id,role)=>async(dispatch)=>{
  try {
    dispatch(updateadminStart());
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,{role},
      config
    );
    dispatch(updateadminSuccess(data));
  } catch (error) {
    dispatch(updateadminFailure(error.response.data.message));
  }
}