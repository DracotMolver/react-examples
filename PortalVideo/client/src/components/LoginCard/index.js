import React from "react";

const LoginCard = ({ onChangePasswordHandler, onSubmitHandler }) => (
  <div className="grid-container">
    <div className="grid-40 grid-parent login-form shadow">
      <form onSubmit={onSubmitHandler}>
        {/* <div className="grid-100 grid-parent login-form-title">
          <span>{FORM_LOGIN_TITLE}</span>
        </div>
        <div className="grid-100 grid-parent">
          <Message messageText={messageText} messageType={messageType} />
        </div>
        <div className="grid-100">
          <label
            onFocus={handlerFocusInputs}
            id="lbl-username"
            className="login-form-label"
            htmlFor="username"
          >
            {INPUT_USER_LABEL}
          </label>
        </div>
        <div className="grid-100">
          <input
            onFocus={handlerFocusInputs}
            onBlur={handlerBlurInputs}
            onChange={setUsername}
            className="login-form-input"
            type="text"
            id="username"
          />
        </div>
        */}
        <div className="grid-100">
          <label className="login-form-label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="grid-100">
          <input
            onChange={onChangePasswordHandler}
            className="login-form-input"
            type="password"
            id="password"
          />
        </div>
        {/* 
        <div className="grid-100">
          <button className="button shadow" type="submit">
            {FORM_LOGIN_LABEL}
          </button>
        </div> */}
      </form>
    </div>
  </div>
);

export default LoginCard;
