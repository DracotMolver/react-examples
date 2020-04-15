import React from "react";

const LogoutButton = ({ onClickLogoutHandler }) => (
  <button type="button" onClick={onClickLogoutHandler}>
    Log out
  </button>
);

export default LogoutButton;
