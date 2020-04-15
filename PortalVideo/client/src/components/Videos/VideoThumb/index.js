import React from "react";
import { Link } from "react-router-dom";
// project
import { VIDEO_LIST_URL } from "./../../../utils/constants";
// styles
import './styles.scss';

const VideoThumb = ({ description, id }) => (
  <Link to={`${VIDEO_LIST_URL}/${id}`}>
    <div className="video-thumb">
      <img src="" alt={description} />
    </div>
  </Link>
);

export default VideoThumb;
