import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../Components/layouts/MetaData";
import Loader from "../../Components/layouts/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { toast } from "react-toastify";
import ProfileImg from "../../assets/prof.png";
const Profile = () => {
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [navigate, isAuthenticated, error]);

  return (
    <Fragment>
      {isLoading || !user ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar ? user.avatar.url : ProfileImg} alt={""} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              {user.role === "admin" ? (
                <div>
                  <h4>Role</h4>
                  <p>{user.role}</p>
                </div>
              ) : (
                ""
              )}
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).slice(0, 10)}</p>
              </div>

              <div>
                {user.role !== "admin" ? (
                  <Link to="/myborrow">My Borrowing Books</Link>
                ) : (
                  ""
                )}
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
