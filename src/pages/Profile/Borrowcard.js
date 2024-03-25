import React, { Fragment } from "react";
import "./borrowcard.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { newReturn } from "../../Actions/useraction";

export default function Borrowcard({ props }) {
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth)
const Returnhandler=(token,id)=>{
  console.log("clicked")
dispatch(newReturn(token,id));
}
  return (
    <Fragment>
      <div className="container1">
        <div className="imgs">
          <img
            src={props.bookItems?.images[0].url}
            alt={props.bookItems?.images[0].public_id}
          />
        </div>

        <div className="details">
          <h2>{props.bookItems.name}</h2>
          <span>ID:{props.bookItems._id}</span>
          <span>Writer:{props.bookItems.writer}</span>
          <span>Branch:{props.bookItems.branch}</span>
        </div>
        <div className={props.borrowStatus==='Borrowed'?"green":"stat"}>

<h2>{props.borrowStatus}</h2>

{props.borrowStatus==='Borrowed'?(  
  <Button variant="contained" onClick={()=>Returnhandler(token,props._id)} >
  Return
</Button>

):""}
        </div>
      </div>
    </Fragment>
  );
}
