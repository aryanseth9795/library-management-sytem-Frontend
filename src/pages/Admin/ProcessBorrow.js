
import React, { Fragment, useEffect } from "react";
import Loader from "../../Components/layouts/Loader/Loader";
import MetaData from "../../Components/layouts/MetaData";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import {resetActions} from "../../Store/Slices/adminslice"
import "./processBorrow.css";
import { approve, updaterequest ,reject} from "../../Actions/adminAction";
export default function ProcessBorrow() {
  let { id } = useParams();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { error, isLoading, process, message } = useSelector(
    (state) => state.admin
  );
const approvehandler=(token,id)=>{
dispatch(approve(token,id))
};
const rejecthandler=(token,id)=>{
  dispatch(reject(token,id))
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      navigate("/admin/requestList");
      dispatch(resetActions())
    }
  }, [ dispatch,error,  message,navigate]);
  useEffect(()=>{
    
    dispatch(updaterequest(token, id));
  },[dispatch, token, id,])
  return (
    <Fragment>
      <MetaData title="Process Borrowing" />

      {isLoading || !process ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="process-container">
            <div className="detailer-container">
              <div className="user-detailer">
                <div>
                  <h2>Request Details</h2>
                </div>
                <div>
                  <h4>Request ID</h4>
                  <h4>{process._id}</h4>
                </div>
                <div>
                  <h4>Requested At</h4>
                  <h4>{process.createdAt}</h4>
                </div>
                <div>
                  <h2>User Details</h2>
                </div>
                <div>
                  <h4>User ID</h4>
                  <h4>{process.user._id}</h4>
                </div>
                <div>
                  <h4>Name</h4>
                  <h4>{process.user.name}</h4>
                </div>
                <div>
                  <h4>E-Mail ID</h4>
                  <h4>{process.user.email}</h4>
                </div>
                {/* <div>
                  <h4>Branch</h4>
                  <h4>{process.user.branch}</h4>
                </div> */}
                <div className="img-profile" >
                  <h4>Profile Image</h4>
                  <img src={process.user.avatar?.url} alt="No Profile Pic"/>
                </div>
              </div>
              <div className="book-detailer">
                <div>
                  <h2>Book Details</h2>
                </div>
                <div>
                  <h4>Book ID</h4>
                  <h4>{process.bookItems._id} {`Stock ${process.bookItems.stock}`}</h4>
                </div>
                <div>
                  <h4>Book Name</h4>
                  <h4>{process.bookItems.name}</h4>
                </div>
                <div>
                  <h4>Writer</h4>
                  <h4>{process.bookItems.writer}</h4>
                </div>
                <div>
                  <h4>Branch</h4>
                  <h4>{process.bookItems.branch}</h4>
                </div>
                <div>
                  <h4>Semester</h4>
                  <h4>{process.bookItems.semester}</h4>
                </div> 
                 <div>
                  <h3> Book Images </h3>
                </div>
                <div className="img-process">
                  <img src={process.bookItems.images[0].url} alt="Book"/>
                </div>
              </div>
            </div>
            <div className="process-detailer">
              <Button variant="contained" color="success" className="ab" onClick={()=>approvehandler(token,id)}>
                Approve
              </Button>
              <Button variant="contained" color="error" className="db"onClick={()=>rejecthandler(token,id)}>
                Reject
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
