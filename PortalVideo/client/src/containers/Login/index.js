import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";
import MD5 from "js-md5";
// project
import { VIDEO_LIST_URL, USER_DATA, AUTH_URL } from "./../../utils/constants";
// components
import LoginCard from "../../components/Cards/LoginCard";

const Login = () => {
  const [state, setState] = useState({
    messageText: "",
    messageType: "",
    password: "",
    username: "",
  });

  const history = useHistory();

  function onChangeHandler(event) {
    event.persist();

    setState(
      produce((draft) => {
        draft[event.target.id] = event.target.value;
      })
    );
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    if (
      is.moreOrEqual(state.password, 2, true) &&
      is.moreOrEqual(state.username, 2, true)
    ) {
      // make a request to the API
      SuperAgent.post(AUTH_URL)
        .type("form") // Shorthand to use the content type as: application/x-www-form-urlencoded
        .send({
          username: state.username,
          password: MD5(state.password),
        })
        .end((err, res) => {
          if (
            is.truthty(err) ||
            (is.truthty(res) && res.body.status !== "success") ||
            is.falsy(res)
          ) {
            setState(
              produce((draft) => {
                draft.messageText = err
                  ? "There was an error. Please, try later"
                  : res.body.error;
                draft.messageType = "error";
              })
            );
          } else {
            // Save in sessionStorage the params returned by the server
            // Just in case the user refresh the website
            sessionStorage.setItem(USER_DATA, JSON.stringify(res.body));
            history.push(VIDEO_LIST_URL);
          }
        });
    } else {
      setState(
        produce((draft) => {
          draft.messageText =
            "The Username and the Password field can't be empty";
          draft.messageType = "warning";
        })
      );
    }
  }

  return (
    <LoginCard
      onChangeHandler={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
      messageText={state.messageText}
      messageType={state.messageType}
    />
  );
};

export default Login;
