import React from "react";
// project
import { getUserData } from "./../../../utils/functions";
// components
import Logout from './../../../containers/Logout';
// styles
import "./styles.scss";

const BarHeader = () => {
  const { username } = getUserData();

  return (
    <div className="grid-100 grid-parent header-nav">
      <div className="grid-container">
        <header>
          <span>Hi {username}!</span>
          <Logout />
        </header>
      </div>
    </div>
  );
};

export default BarHeader;
