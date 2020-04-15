import React from "react";
// styles
import './styles.scss';

const VideoDescription = ({ description }) => (
  <div>
    <p className="video-description">{description}</p>
    <div className="line-separator"></div>
  </div>
);

export default VideoDescription;
