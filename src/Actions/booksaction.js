import {
  all_books_fail,
  all_books_request,
  all_books_success,
  bookdetail_fail,
  bookdetails_request,
  bookdetails_success,
} from "../Store/Slices/booksslice";
import axios from "axios";
export const getallbooks =
  (token, keyword = "", currentPage = 1, branch,semester) =>
  async (dispatch) => {
    try {
      dispatch(all_books_request());

      let link = `/api/v1/books/?keyword=${keyword}&page=${currentPage}`;

      if (branch) {
        link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&branch=${branch}`;
      }if ( semester) {
        link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&semester=${semester}`;
      }if (branch && semester) {
        link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&branch=${branch}&semester=${semester}`;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      };

      const { data } = await axios.get(link, config);
      dispatch(all_books_success(data));
    } catch (error) {
      dispatch(all_books_fail(error.response.data.message));
    }
  };

export const booksdetails = (token,id) => async (dispatch) => {
  dispatch(bookdetails_request());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/books/${id}`,config);
    dispatch(bookdetails_success(data));
  } catch (error) {
    dispatch(bookdetail_fail(error.response.data.message));
  }
};


