import React from "react";

const VideoFullScreen = ({ url }) => (
  <div>
    <video height="auto" width="100%" controls="true">
      <source src={url} type="video/mp4"></source>
    </video>
    <div className="video-hover">Play</div>
  </div>
);

export default VideoFullScreen;
