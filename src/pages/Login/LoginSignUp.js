import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../../Components/layouts/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutline from "@mui/icons-material/MailOutline";
import LockOpen from "@mui/icons-material/LockOpen";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Actions/useraction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearerrors } from "../../Store/Slices/userslices";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const token = useSelector((state) => state.auth.token);
  const message = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearerrors());
    }
    if (isAuthenticated) {
      toast.success(message);
    }
  }, [isAuthenticated, navigate, error, token, message, dispatch]);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [eye, setEye] = useState("password");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(registerUser(myForm));
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginEmail, loginPassword));
  };
const eyehandler=(type)=>{
setEye(type);
}
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <section className="wrapper">
              <div className="stars"></div>
              <div className="stars2"></div>
              <div className="stars3"></div>
            </section>
            <div className="LoginSignUpBox">
              <div className="heading-login">
                <h2>Library Management System-IIIT</h2>
              </div>

              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type={eye}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                    {
                    eye==="password"?(<VisibilityOutlinedIcon onClick={()=>eyehandler("text")}/>):(<VisibilityOffOutlinedIcon onClick={()=>eyehandler("password")} />)
                  }
                </div>
                <button type="submit" value="Login" className="loginBtn">
                  Login
                </button>
                <Link to="/password/forgot">Forget Password ?</Link>
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <PortraitOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenOutlinedIcon />
                  <input
                    type={eye}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  {
                    eye==="password"?(   <VisibilityOutlinedIcon onClick={()=>eyehandler("text")}/>):(<VisibilityOffOutlinedIcon onClick={()=>eyehandler("password")} />)
                  }
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
