import React from "react";
import iiitlogo from "../../../assets/IIIT.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        {" "}
        <img src={iiitlogo} alt="IIIT Bhagalpur" />
      </div>

      <div className="midFooter">
        <h3>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY </h3>
        <p>Copyrights 2024 &copy; Aryan</p>
        <p>Developed and Desinged By Aryan Seth</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://aryanseth9795.github.io/my_portfolio">Portolio</a>
        <a href="https://www.linkedin.com/in/aryanseth9795">LinkedIn</a>
        <a href="https://www.instagram.com/aryanseth9795">Instagram</a>
      
      </div>
    </footer>
  );
};

export default Footer;
