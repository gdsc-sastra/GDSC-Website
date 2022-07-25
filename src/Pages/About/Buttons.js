import React from "react";
import fb from "./assets/fb.png";
import med from "./assets/med.png";
import playStore from "./assets/playStore.png";
import youTube from "./assets/youTube.png";
import insta from "./assets/insta.png";
import linkedin from "./assets/linkedIn.png";
import twitter from "./assets/twitter.png";
import { HashLink as Link } from "react-router-hash-link";

const Buttons = ({ type }) => {
  if (type === 1) {
    return (
      <div className="AboutContactBtn">
        <Link to="/#contact">
          <button> Contact Us </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="Contact-mediaButtons">
      <button
        onClick={() => {
          window.open("https://www.instagram.com/gdsc_sastra");
        }}
      >
        <img src={insta} alt="instagram" width="40px" />
      </button>
      <button
        onClick={() => {
          window.open("https://twitter.com/gdsc_sastra");
        }}
      >
        <img src={twitter} alt="twitter" width="40px" />
      {/* </button>
      <button
        onClick={() => {
          window.open("https://www.facebook.com/dscsastra");
        }}
      >
        <img src={fb} alt="fb" width="40px" /> */}
      </button>
      <button
        onClick={() => {
          window.open("https://www.linkedin.com/company/gdsc-sastra");
        }}
      >
        <img src={linkedin} alt="linkedIn" width="40px" />
      </button>
      {/* <button
        onClick={() => {
          window.open("https://medium.com/dsc-sastra-deemed-to-be-university");
        }}
      >
        <img src={med} alt="med" width="40px" />
      </button> */}
      <button
        onClick={() => {
          window.open("https://www.youtube.com/channel/UCePpJcb3Ri68P-rvSPqvraA");
        }}
      >
        <img src={youTube} alt="you tube" width="40px" />
      </button>
      {/* <button
        onClick={() => {
          window.open(
            "https://play.google.com/store/apps/details?id=dsc.sastra.dsc_sastra_university"
          );
        }}
      >
        <img id="playStore" src={playStore} alt="playStore" width="20px" />
      </button> */}
    </div>
  );
};
export default Buttons;
