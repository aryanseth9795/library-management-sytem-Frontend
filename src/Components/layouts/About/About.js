import React from "react";
import "./aboutSection.css";
import Typography from "@mui/material/Typography";
import { Button, Avatar } from "@mui/material";
import { Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import founder from "../../../assets/pic_resume.png";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/aryanseth9795";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "15vmax", margin: "2vmax 0" }}
              src={founder}
              alt="Founder"
            />
            <Typography>Aryan Seth</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @aryanseth. Only with the purpose
              to learn MERN stack project
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Contacts</Typography>

            <a href="https://instagram.com/aryanseth9795" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/aryanseth9795" target="blank">
              <LinkedIn className="instagramSvgIcon" />
            </a>
            <a href="https://github.com/aryanseth9795" target="blank">
              <GitHub className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
