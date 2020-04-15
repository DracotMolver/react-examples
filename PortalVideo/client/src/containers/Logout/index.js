import React from "react";
import SuperAgent from "superagent";
// project
import { getUserData } from "./../../utils/functions";
import { LOGOUT_URL } from "./../../utils/constants";
// components
import LogoutButton from "./../../components/LogoutButton";

const Logout = () => {
  function onClickLogoutHandler() {
    const { sessionId } = getUserData();

    SuperAgent.get(LOGOUT_URL)
      .type("form")
      .query({
        sessionId,
      })
      .end((err, res) => {
        if (res.body.status === "success") {
          // Clean all sessions
          sessionStorage.clear();
          window.location.href = "/";
        }
      });
  }

  return <LogoutButton onClickLogoutHandler={onClickLogoutHandler} />;
};

export default Logout;
