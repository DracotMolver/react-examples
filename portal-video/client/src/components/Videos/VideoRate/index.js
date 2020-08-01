import React from "react";
// styles
import img from "./stars.png";
import "./styles.scss";

const getPercentRating = (ratings) => {
  const total = ratings.reduce((ratingA, ratingB) => ratingA + ratingB, 0);
  return String((total * (ratings.length * 5)) / 100);
};

const VideoRate = ({ ratings }) => (
  <div className="video-img">
    <div
      className="video-img-rating"
      style={{ width: `${getPercentRating(ratings || [])}%` }}
    ></div>
    <img srcSet={img} width="100%" height="100%" />
  </div>
);

export default VideoRate;
