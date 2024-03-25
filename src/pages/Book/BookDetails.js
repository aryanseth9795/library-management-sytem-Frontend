import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./BookDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { booksdetails } from "../../Actions/booksaction.js";
import {  newborrow } from "../../Actions/useraction.js";
import Loader from "../../Components/layouts/Loader/Loader.js";
import MetaData from "../../Components/layouts/MetaData.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { clearErrors } from "../../Store/Slices/profileslice.js";
import { newborrowReset } from "../../Store/Slices/profileslice.js";
import InfoIcon from '@mui/icons-material/Info.js';
import { Dialog, DialogTitle, DialogContent } from "@mui/material"; 

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { book, isLoading, error, status } = useSelector(
    (state) => state.all_books
  );
  const { token } = useSelector((state) => state.auth);
  const {
    message,
    error: requestError,
    loading,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const borrowHandler = () => {
    dispatch(newborrow(token, id));
  
  };
  const handleInfoButtonClick = () => {

    setInfoDialogOpen(true);
  };

  const handleCloseInfoDialog = () => {
 
    setInfoDialogOpen(false);
  };
 
    useEffect(() => {
           dispatch(booksdetails(token,id));
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (requestError) {
        toast.error(requestError);
        dispatch(clearErrors());
      }
      if (message) {
        toast.success(message);
        toast.success("Check Info! Its important");
      }
      if (isUpdated) {
        dispatch(newborrowReset());
      }
      // Dependency array
    }, [dispatch, id, token, error, requestError, message, isUpdated]);
   
  return (
    <Fragment>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${book.name}--IIIT Bhagalpur`} />
          <div className="ProductDetails">
            <div>
              <Carousel useKeyboardArrows={true}>
                {book.images &&
                  book.images.map((item, i) => (
                    <img className="CarouselImage" src={item.url} alt="im" />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{book.name}</h2>
                <p>Book # {book._id}</p>
              </div>

              <div className="detailsBlock-3">
                <h3>{` Branch :${book.branch}`}</h3>
                {book.branch!=="Not Academic"?(
                <h3>{` Semester :${book.semester}`}</h3>

                ) :""}
             
                <div className="detailsBlock-3-1">
                  <Button
                    disabled={
                      book.availability < 1 || status !== "Borrow" ? true : false
                    }
                    onClick={borrowHandler}
                  >
                    {status}
                  </Button>
                  {status !== "Borrow" && (
                  <Button variant="contained" endIcon={<InfoIcon /> } onClick={handleInfoButtonClick}>
                  Info
                </Button>
                )}
                </div>
                <p>
                  Status :
                  <b className={book.stock < 1 ? "redColor" : "greenColor"}>
                    {book.stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                <h2> Author: {book.writer}</h2>
                <br />
                <span>Description : {book.description}</span>
              </div>
            </div>
          </div>
              {/* Info Dialog */}
              <Dialog open={infoDialogOpen} onClose={handleCloseInfoDialog} >
            <DialogTitle className="dia"><h1>Important Information</h1></DialogTitle> 
            <DialogContent className="dia-1">
            <h2>Visit Library For Picking Book</h2>
              <p>If You not take book within three days from request date,Your request get terminated</p>
            </DialogContent>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
