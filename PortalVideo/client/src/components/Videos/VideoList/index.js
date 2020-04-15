import React from "react";
// project
import Spinner from './../../../utils/HOC/Spinner';
// styles
import './styles.scss';

// Generate the list of videos cards.
const VideoList = ({ videoListItems }) => (
  videoListItems.map((video) => (
    <div
    className="video-list-item grid-25 mobile-grid-50"
      key={`${video._id}`}
      id={`${video._id}`}
    >
      <VideoCardSmall video={video} />
    </div>
  ))
);

export default Spinner("videoListItems")(VideoList);
