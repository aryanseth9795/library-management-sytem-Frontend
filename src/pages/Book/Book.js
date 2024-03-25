import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Books.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/layouts/Loader/Loader";
import ProductCard from "../Landing_page/ProductCard";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import MetaData from "../../Components/layouts/MetaData";
import { getallbooks } from "../../Actions/booksaction";

const branches = ["CSE", "ECE", "MEA", "Not Academic"];
const Semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const Books = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [branch, setbranch] = useState("");
  const [sem, setsem] = useState("");

  const { isLoading, error } = useSelector((state) => state.all_books);
  const {
    allbooks: book,
    booksCount,
    resultPerPage,
    filteredbooksCount,
  } = useSelector((state) => state.all_books.book);
  const token = useSelector((state) => state.auth.token);

  let { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredbooksCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getallbooks(token, keyword, currentPage, branch, sem));
  }, [dispatch, token, keyword, currentPage, branch, error, sem]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="BOOKS-IIIT LIBRARY" />
          <h2 className="productsHeading">Books</h2>
          <div className="products">
            {book && book.length !== 0 ? (
              book.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div>
                <h1>No Book Found</h1>
              </div>
            )}
          </div>

          <div className="filterBox">
            <h2>Filters...</h2>
            <Typography>BRANCH</Typography>
            <ul className="categoryBox">
              {branches.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setbranch(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            {branch!=="Not Academic"?(
              <Fragment>
                <Typography>SEMESTERS</Typography>
            <ul className="categoryBox">
              {Semesters.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setsem(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
              </Fragment>
            ):""}
            
          </div>
          {resultPerPage < booksCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={booksCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Books;
