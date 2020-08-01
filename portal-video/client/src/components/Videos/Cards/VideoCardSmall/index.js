import React from "react";
// components
import VideoDescription from "../../VideoDescription";
import VideoThumb from "../../VideoThumb";
import VideoRate from '../../VideoRate';
// styles
import "./styles.scss";

const VideoCardSmall = ({ video }) => (
  <div className="grid-100 video-container shadow zoomInUp-anim">
    <div className="grid-100">
      <h4 className="video-title">{video.name}</h4>
    </div>
    <div className="grid-100">
      <VideoThumb id={video._id} description={video.description} />
    </div>
    <div className="grid-100">
      <VideoDescription description={video.description} />
    </div>
    <div className="grid-100">
      <VideoRate ratings={video.ratings} />
      </div>
  </div>
);

export default VideoCardSmall;
