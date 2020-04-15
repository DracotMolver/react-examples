import React from "react";

const Modal = (props) => {
  let time = null;

  function onAutoCloseHandler() {
    const { onClickCloseHandler } = props;

    onClickCloseHandler();
    clearTimeout(time);
  }

  const { isCloseDelay, children, name } = props;

  if (isCloseDelay) {
    time = setTimeout(onAutoCloseHandler, 2600);
  }

  return (
    <div>
      <div className="grid-100">
        <div className="rate-close-popup" onClick={onAutoCloseHandler}>
          Close &#10005;
        </div>
      </div>
      <div className="grid-100">
        <h3>{name}</h3>
      </div>
      <div className="grid-100 grid-parent">{children}</div>
    </div>
  );
};

export default Modal;
