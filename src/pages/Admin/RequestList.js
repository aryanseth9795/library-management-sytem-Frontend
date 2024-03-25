import React, { Fragment, useEffect } from "react";
import {DataGrid} from "@mui/x-data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import MetaData from "../../Components/layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import SideBar from "./Sidebar";
import { BorrowListReq } from "../../Actions/adminAction";
import {clearErrors} from "../../Store/Slices/adminslice";
const RequestList = () => {
  const dispatch = useDispatch();
  const {token,error} = useSelector((state) => state.auth);
  const {
    Request,
  } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(BorrowListReq(token,"Requested"));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error,  token]);
  const columns = [
    { field: "date", headerName: "Date", minWidth: 50, flex: 0.5 },
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    { field: "name", headerName: "Book Name", minWidth: 100, flex: 1 },
    { field: "user_id", headerName: "User ID", minWidth: 100, flex: 1 },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/borrow/${params.id}`}>
              <Button variant="outlined" endIcon={<EditIcon />}>
                Process
              </Button>
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  Request &&
    Request.forEach((item) => {
      rows.push({
        id: item._id,
        user_id: item.user,
        name: item.bookItems?.name,
        date: item.createdAt,
        status: item.borrowStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Borrow Request-Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL BORROW REQUEST</h1>
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
export default RequestList;
