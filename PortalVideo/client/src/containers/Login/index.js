import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SuperAgent from "superagent";
import produce from "immer";
import { is } from "quartzjs";
// project
import { VIDEO_LIST_URL } from "./../../utils/constants";
// components
import LoginCard from "../../components/Card/LoginCard";

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
        draft[event.currentTarget.id] = event.currentTarget.value;
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
      SuperAgent.post("http://localhost:3000/user/auth")
        .type("form") // Shorthand to use the content type as: application/x-www-form-urlencoded
        .send({
          username: state.username,
          password: state.password,
        })
        .end((err, res) => {
          if (err || res.body.status !== "success") {
            setState(
              produce((draft) => {
                draft.messageText = err
                  ? "There was an error. Please, try later"
                  : res.body.error;
                draft.messageType = "error";
              })
            );
          }

          // Save in sessionStorage the params returned by the server
          // Just in case the user refresh the website
          if (res.body.status === "success") {
            sessionStorage.setItem("userData", JSON.stringify(res.body));

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