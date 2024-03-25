import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../../Components/layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePasswordReset,clearErrors } from "../../Store/Slices/profileslice";
import MetaData from '../../Components/layouts/MetaData';
import LockOpen from "@mui/icons-material/LockOpen";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, useParams } from "react-router-dom";
import { ResetPassword } from "../../Actions/useraction";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const{token}=useParams();
  const { error,  loading,message } = useSelector((state) => state.profile);
 

  const [eye, setEye] = useState("password");
  const [eye1, setEye1] = useState("password");
  
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", newpassword);
    myForm.set("confirmpassword", confirmpassword);

    dispatch(ResetPassword(token,myForm));
  };
  const eyehandler=(type,number)=>{
    if(number===1){
    setEye(type);
    }
    if(number===2){
      setEye1(type)
    }
    
    }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      toast.success("Login Again");
      navigate("/");

      dispatch(updatePasswordReset());
    }
  }, [dispatch,error,message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">RESET PASSWORD</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
              
                <div className="resetPassword">
                  <LockOpen />
                  <input
                    type={eye}
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                     {
                    eye==="password"?(   <VisibilityOutlinedIcon onClick={()=>eyehandler("text",1)}/>):(<VisibilityOffOutlinedIcon onClick={()=>eyehandler("password",1)} />)

                  }
                </div>
                <div className="resetPassword">
                  <LockIcon />
                  <input
                    type={eye1}
                    placeholder="Confirm Password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                     {
                    eye1==="password"?(   <VisibilityOutlinedIcon onClick={()=>eyehandler("text",2)}/>):(<VisibilityOffOutlinedIcon onClick={()=>eyehandler("password",2)} />)

                  }
                </div>
                <input
                  type="submit"
                  value="UPDATE"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
