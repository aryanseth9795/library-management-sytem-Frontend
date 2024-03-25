import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../Components/layouts/MetaData";
import SideBar from "./Sidebar";
import { BorrowListReq } from "../../Actions/adminAction";
import {  clearErrors } from "../../Store/Slices/adminslice";
const OrderList = () => {
  const dispatch = useDispatch();
  const { token, } = useSelector((state) => state.auth);
  const {
    error,
    Borrowed,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(BorrowListReq(token));
  }, [dispatch, error, token]);

  const columns = [
    { field: "date", headerName: "Date", minWidth: 100, flex: .5 },
    { field: "id", headerName: "Order ID", minWidth: 100, flex: 0.8 },
    { field: "user_id", headerName: "User ID", minWidth: 100, flex: 0.8 },
    { field: "book_id", headerName: "Book ID", minWidth: 100, flex: 0.8 },
    { field: "name", headerName: "Book Name", minWidth: 100, flex: 1 },
  ];

  const rows = [];

  Borrowed &&
    Borrowed.forEach((item) => {
      rows.push({
        id: item._id,
        book_id: item.bookItems._id,
        user_id: item.user,
        name: item.bookItems.name,
        date:item.borrowAt,
        // date: item.createdAt,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Borrow Request-Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL BORROWED</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
