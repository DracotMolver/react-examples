import React from "react";
import { Link } from "react-router-dom";
// project
import { VIDEO_LIST_URL } from "./../../../../utils/constants";
// components
import VideoDescription from "./../../VideoDescription";
import VideoRate from "./../../VideoRate";
// styles
import "./styles.scss";

const VideoCardBig = ({
  onClickHideModalHandler,
  onClickRateHandler,
  displayModal,
  description,
  ratings,
  name,
  _id,
}) => (
  <div className="video-single-container">
    {/* <VideoRateContainer
                idToRate={_id}
                displayModal={displayModal}
                onClickHideModalHandler={onClickHideModalHandler}
            /> */}
    <div className="grid-container">
      <div className="grid-100">
        <Link className="back-arrow" to={VIDEO_LIST_URL}>
          &larr; {"Back to the list"}
        </Link>
      </div>
      <div className="grid-100 grid-parent video-container shadow">
        <div className="grid-100 grid-parent">
          <div className="grid-50">
            <h4 className="video-title">{name}</h4>
          </div>
          <div className="grid-50 grid-parent">
            <div
              className="grid-80 mobile-grid-70"
              style={{ textAlign: "right" }}
            >
              <VideoRate ratings={ratings} />
            </div>
            <div className="grid-20 mobile-grid-30">
              <button
                type="button"
                className="rate-button"
                onClick={onClickRateHandler}
              >
                'Rate!'
              </button>
            </div>
          </div>
        </div>
        <div className="grid-100">{/* <VideoFullScreen url={url} /> */}</div>
        <div className="grid-100">
          <VideoDescription description={description} />
        </div>
      </div>
    </div>
  </div>
);

export default VideoCardBig;
