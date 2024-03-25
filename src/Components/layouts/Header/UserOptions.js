import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../Store/Slices/userslices";
import { useDispatch } from "react-redux";
import Profile from "../../../assets/prof.png";
const UserOptions = ({ user }) => {

  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonOutlineSharpIcon />, name: "Profile", func: account },
    { icon: <ExitToAppSharpIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardSharpIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role !== "admin") {
    options.unshift(
      { icon: <ListAltSharpIcon />, name: "Borrowed", func: borrow }
    );
  }
  function dashboard() {
    history("/admin/dashboard");
  }

  function borrow() {
    history("/myborrow");
  }
  function account() {
    history("/account");
  }
 
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    history("/");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar ? user.avatar.url : Profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
