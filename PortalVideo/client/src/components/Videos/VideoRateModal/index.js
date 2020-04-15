import React from "react";
// components
import Modal from "../../Widgets/Modal";
// styles
import './styles.scss';

const VideoRateModal = ({
  onClickCloseHandler,
  onChangeRateHandler,
  onClickVoteHandler,
  displayModal,
  isSuccess,
}) => (
  <div className={`rate-stars-container ${displayModal ? "" : "hide"}`}>
    <div className="grid-container">
      <div
        className={`rate-stars-popup shadow ${
          displayModal ? "fadeInDown-anim" : ""
        }`}
      >
        <Modal
          onClickCloseHandler={onClickCloseHandler}
          isCloseDelay={isSuccess}
          name={isSuccess ? "Thanks for rating the video! :)" : ""}
        >
          {!isSuccess && (
            <div>
              <div className="grid-100 rate-stars-input">
                <div className="grid-20 mobile-grid-20">
                  <input
                    className="option-input"
                    onChange={onChangeRateHandler}
                    value="1"
                    name="rateVideo"
                    type="radio"
                  />
                  1
                </div>
                <div className="grid-20 mobile-grid-20">
                  <input
                    className="option-input"
                    onChange={onChangeRateHandler}
                    value="2"
                    name="rateVideo"
                    type="radio"
                  />
                  2
                </div>
                <div className="grid-20 mobile-grid-20">
                  <input
                    className="option-input"
                    onChange={onChangeRateHandler}
                    value="3"
                    name="rateVideo"
                    type="radio"
                  />
                  3
                </div>
                <div className="grid-20 mobile-grid-20">
                  <input
                    className="option-input"
                    onChange={onChangeRateHandler}
                    name="rateVideo"
                    value="4"
                    type="radio"
                  />
                  4
                </div>
                <div className="grid-20 mobile-grid-20">
                  <input
                    className="option-input"
                    onChange={onChangeRateHandler}
                    value="5"
                    name="rateVideo"
                    type="radio"
                  />
                  5
                </div>
              </div>
              <div className="grid-100">
                <div className="rate-button-container">
                  <button
                    type="button"
                    className="button shadow"
                    onClick={onClickVoteHandler}
                  >
                    {POPUP_BUTTON}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  </div>
);

export default VideoRateModal;
