import React from "react";
// project
import { getUserData } from "./../../../utils/functions";
// styles
import "./styles.scss";

const BarHeader = () => {
  const { username } = getUserData();

  return (
    <div className="grid-100 grid-parent header-nav">
      <div className="grid-container">
        <header>
          <span>Hi {username}!</span>
          {/* <LogoutContainer /> */}
        </header>
      </div>
    </div>
  );
};

export default BarHeader;
