import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Components/layouts/MetaData";
import Loader from "../../Components/layouts/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import "./userupdate.css";
import { toast } from "react-toastify";
import UserupdateImg from "../../assets/prof.png";
import { Button } from "@mui/material";
import { updatetoadmin, useradmin } from "../../Actions/adminAction";
import { resetActions } from "../../Store/Slices/adminslice";
const Userupdate = () => {
  const { token } = useSelector((state) => state.auth);
  const { message, isLoading, error, user } = useSelector(
    (state) => state.admin
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const updatehandler = (token, id,role) => {
    dispatch(updatetoadmin(token, id,role));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      dispatch(resetActions());
    }
    dispatch(useradmin(token, id));
  }, [navigate, message, error, dispatch, id, token]);

  return (
    <Fragment>
      {isLoading || !user ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s User Update`} />
          <div className="UserupdateContainer">
            <div>
              <h1>User Update</h1>
              <img
                src={user.avatar ? user.avatar.url : UserupdateImg}
                alt={""}
              />
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
              {user.role ? (
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
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updatehandler(token, id, "admin")}
                  >
                    Update to admin
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updatehandler(token, id, "user")}
                  >
                    Update TO User
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Userupdate;
