import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import MetaData from "../../Components/layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { deleteUser,getAllUsers } from "../../Actions/adminAction";
import { resetActions,clearErrors } from "../../Store/Slices/adminslice";
import Loader from "../../Components/layouts/Loader/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
const navigate= useNavigate();

  const  {error,message,isdeleted,isLoading} = useSelector((state) => state.admin);
  const  users  = useSelector((state) => state.admin.allUsers);
  const {token}  = useSelector((state) => state.auth);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(token,id));
  };

  useEffect(() => {
    if (error) {
     toast.error(error);
      dispatch(clearErrors());
    }
    if (isdeleted) {
      toast.success(message);
     navigate("/admin/users");
      dispatch(resetActions());
    }

    dispatch(getAllUsers(token));
  }, [dispatch, error, navigate,  isdeleted, message,token]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.role=== "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

    {isLoading?(<Loader/>):(
      <Fragment>  <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={25}
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

export default UsersList;
