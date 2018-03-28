/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * It will show the amount of rating filling the starts.
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

const VideoRating = props => {
    const { ratings } = props;

    const getPercentRating = () => {
        const total = ratings.reduce((a, b) => a + b, 0);
        return ((100 * total) / (ratings.length * 5)).toString();
    };

    return (
        <div className="video-img">
            <div
                className="video-img-rating"
                style={{ width: `${getPercentRating()}%` }}>
            </div>
            <img srcSet="output/stars.png" width="100%" height="100%" />
        </div>
    );
};

VideoRating.propTypes = {
    ratings: PropTypes.arrayOf(PropTypes.number)
};

export default VideoRating;
