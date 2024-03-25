import React from "react";
import  {ReactNavbar,}  from "overlay-navbar";
import logo from "../../../assets/IIIT.png";
import {FaUserAlt,FaSearch} from "react-icons/fa";


const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "5px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Books",
  link3Text: "About",
  link4Text: "Logout",
  link1Url: "/",
  link2Url: "/books",
  link3Url: "/about",
  link4Url: "/logout",
  link1Size: "2.2vmax ",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/account",
  SearchIconUrl: "/search",
  profileIconColor: "green",
  searchIconColor: "green",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "green",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon:true,
  searchIcon:true, 
  searchIconMargin:"2.5vmax"
  
};

const Header = () => {

  return <ReactNavbar {...options} ProfileIconElement={FaUserAlt} SearchIconElement={FaSearch} 
  />;
};

export default Header;