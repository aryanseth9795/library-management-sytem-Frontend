import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  getAdminbook,
  BorrowListReq,
  BorrowList,
} from "../../Actions/adminAction.js";
import { toast } from "react-toastify";
import MetaData from "../../Components/layouts/MetaData";
import { CategoryScale, Chart } from "chart.js";
import { registerables } from "chart.js";
import { clearErrors } from "../../Store/Slices/adminslice.js";
import Loader from '../../Components/layouts/Loader/Loader.js'
Chart.register(...registerables);
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allUsers, Allbooks, Borrowed, error, Request ,isLoading} = useSelector(
    (state) => state.admin
  );
  const { token } = useSelector((state) => state.auth);

  let outOfStock = 0;

  Allbooks &&
    Allbooks.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminbook(token));
    dispatch(BorrowListReq(token,"Requested"));
    dispatch(getAllUsers(token));
    dispatch(BorrowList(token));
  }, [dispatch, token, error]);

  let totalissue = Request.length;
  const lineState = {
    labels: ["Issued Books", "Total Book Issued"],
    datasets: [
      {
        label: "TOTAL Books Issued ",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalissue],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, Allbooks.length - outOfStock],
      },
    ],
  };

  return (
  <Fragment>
{
  isLoading?(<Loader/>):(<Fragment>
  <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div></div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/books">
              <p>Books</p>
              <p>{Allbooks && Allbooks.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUsers && allUsers.length}</p>
            </Link>
            <Link to="/admin/requestList">
              <p>Requests</p>
              <p>{Request && Request.length}</p>
            </Link>
            <Link to="/admin/borrowList">
              <p>Borrowed</p>
              <p>{Borrowed && Borrowed.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>



  </Fragment>)
}



  </Fragment>
  );
};

export default Dashboard;
