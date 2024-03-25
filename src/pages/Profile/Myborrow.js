import React, { Fragment, useEffect, useState } from "react";
import './myborrow.css'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/layouts/Loader/Loader";
import { toast } from "react-toastify";
import { Myborrowfun } from "../../Actions/useraction";
import MetaData from "../../Components/layouts/MetaData";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Borrowcard from './Borrowcard'
import { newreturnReset } from "../../Store/Slices/profileslice";
export default function Myborrow() {
  const { loading, error ,borrow,message} = useSelector((state) => state.profile);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState("Borrowed");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if(message){
      toast.success(message);
      dispatch(newreturnReset())
    }
    dispatch(Myborrowfun(token,alignment));
  }, [error, token, dispatch,alignment,message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Borrowing`} />
          <div className="containerB">
            <div className="nav11">
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="Requested">Borrow Request</ToggleButton>
                <ToggleButton value="Borrowed">My Borrowed</ToggleButton>
                <ToggleButton value="ReturnR"> Return Request </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className="list">
            {borrow && borrow.length !== 0 ? (
              borrow.map((product) => (
              
                <Borrowcard key={product._id} props={product} />
              ))
            ) : (
              <div>
                <h1>No Borrow Found</h1>
              </div>
            )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
