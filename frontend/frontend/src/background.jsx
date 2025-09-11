import React from "react";
import loginImg from "./login.png"; // your background image

const Background = () => {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1
      }}
    ></div>
  );
};

export default Background;
