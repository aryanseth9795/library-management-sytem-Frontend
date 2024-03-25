import { useEffect, React } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/Slices/userslices";
import { useNavigate } from "react-router-dom";
import "./logout.css";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [dispatch, navigate]);
  return (
    <>
      <div className="logout container">
        <h1>Logout Successfully....</h1>
        <span>See You Again...</span>
      </div>
    </>
  );
}
