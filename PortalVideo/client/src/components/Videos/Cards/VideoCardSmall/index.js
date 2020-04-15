import React from "react";
// components
import VideoDescription from "Components/Video/Description";
import VideoRating from "Components/Video/Rate/Rate";
import VideoThumb from "Components/Video/Thumb";
// styles
import './styles.scss';

const VideoCardSmall = ({ description, ratings, name, _id }) => (
  <div className="grid-100 video-container shadow zoomInUp-anim">
    <div className="grid-100">
      <h4 className="video-title">{name}</h4>
    </div>
    <div className="grid-100">
      <VideoThumb id={_id} description={description} />
    </div>
    <div className="grid-100">
      <VideoDescription description={description} />
    </div>
    <div className="grid-100">
      <VideoRating ratings={ratings} />
    </div>
  </div>
);

export default VideoCardSmall;
