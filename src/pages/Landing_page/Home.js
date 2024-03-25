import React, { Fragment, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/layouts/Loader/Loader";
import { getallbooks } from "../../Actions/booksaction";
import MetaData from "../../Components/layouts/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard";
import MouseIcon from "@mui/icons-material/Mouse";
import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
export default function Books(){
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { isLoading, error } = useSelector((state) => state.all_books);
  const book = useSelector((state) => state.all_books.book.allbooks);
  const { token } = useSelector((state) => state.auth);
  const redirect1=()=>{
    navigate("/Search")
      }
  const redirect2=()=>{
navigate("/books")
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
    dispatch(getallbooks(token));
  }, [dispatch, error, token]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="IIIT Library" />

          <div className="banner">
            <p>WELCOME TO IIIT BHAGALPUR LIBRARY</p>
            <h1>FIND AMAZING BOOKS BELOW</h1>

            <a href="#container">
              <button>
                <MouseIcon style={{ fontSize: "3vmax" }} />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Books</h2>
          <div className="container" id="container">
            {book &&
              book.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="but">
            <Button variant="contained" onClick={()=>redirect1()} >
              Search Book
            </Button>
            <Button variant="contained" onClick={()=>redirect2()}>
              More Books...
            </Button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
