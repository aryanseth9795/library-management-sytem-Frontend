import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../../Components/layouts/Loader/Loader";
import MailOutline from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../../Components/layouts/MetaData";
import { clearerrors, reset } from "../../Store/Slices/userslices";
import { forgotPassword } from "../../Actions/useraction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, forget, isLoading } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearerrors());
    }

    if (forget) {
      toast.success(forget);
      dispatch(reset());
      setEmail("")
    }
  }, [dispatch, error,  forget]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                 <MailOutline/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
