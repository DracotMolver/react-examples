import React from "react";
// styles
import "./styles.scss";

const msgCSSClass = {
  error: "msg-error",
  success: "msg-success",
  warning: "msg-warning",
};

const Message = ({ type, children }) => (
  <div className="gird-100">
    <div className={type ? msgCSSClass[type] : ""}>
      {console.log(type, msgCSSClass[type])}
      {children}
    </div>
  </div>
);

export default Message;
