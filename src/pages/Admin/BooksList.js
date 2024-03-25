import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import MetaData from "../../Components/layouts/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import Loader from "../../Components/layouts/Loader/Loader";
import { deletebook, getAdminbook } from "../../Actions/adminAction";
import { resetActions, clearErrors } from "../../Store/Slices/adminslice";
const Bookslist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { error, isdeleted, Allbooks, isLoading } = useSelector(
    (state) => state.admin
  );
  const deleteProductHandler = (id) => {
    dispatch(deletebook(token, id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isdeleted) {
      toast.success("Book Deleted Successfully");
      dispatch(resetActions());
    }
    dispatch(getAdminbook(token));
  }, [dispatch, error, isdeleted, navigate, token]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.6 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "writer",
      headerName: "Writer",
      minWidth: 200,
      flex: 0.4,
    },
    {
      field: "branch",
      headerName: "Branch",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "semester",
      headerName: "Semester",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            {/* <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link> */}
            <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  Allbooks &&
    Allbooks.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        writer: item.writer,
        name: item.name,
        branch: item.branch,
        semester: item.semester,
      });
    });

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`ALL BOOKS - Admin`} />

          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Books</h1>

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
      )}
    </Fragment>
  );
};
export default Bookslist;
