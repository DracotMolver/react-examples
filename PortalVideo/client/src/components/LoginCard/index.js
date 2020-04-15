import React from "react";
// components
import Message from "../Widgets/Message";
// styles
import './styles.scss';

const LoginCard = ({
  onChangeHandler,
  onSubmitHandler,
  messageText,
  messageType,
}) => (
  <div className="grid-container">
    <div className="grid-40 grid-parent login-form shadow">
      <form onSubmit={onSubmitHandler}>
        <div className="grid-100 grid-parent login-form-title">
          <span>Portal video</span>
        </div>
        <div className="grid-100 grid-parent">
          <Message type={messageType}>{messageText}</Message>
        </div>
        <div className="grid-100">
          <label
            className="login-form-label"
            htmlFor="username"
            id="lbl-username"
          >
            User name
          </label>
        </div>
        <div className="grid-100">
          <input
            className="login-form-input"
            onChange={onChangeHandler}
            type="text"
            id="username"
          />
        </div>
        <div className="grid-100">
          <label className="login-form-label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="grid-100">
          <input
            onChange={onChangeHandler}
            className="login-form-input"
            type="password"
            id="password"
          />
        </div>
        <div className="grid-100">
          <button className="button shadow" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default LoginCard;
