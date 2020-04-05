/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

const getPercentRating = ratings => {
    const total = ratings.reduce((ratingA, ratingB) => ratingA + ratingB, 0);
    return (total * (ratings.length * 5) / 100).toString();
};

const VideoRate = props => {
    const { ratings } = props;

    return (
        <div className="video-img">
            <div
                className="video-img-rating"
                style={{ width: `${getPercentRating(ratings)}%` }}>
            </div>
            <img srcSet="dist/stars.png" width="100%" height="100%" />
        </div>
    );
};

VideoRate.propTypes = {
    ratings: PropTypes.arrayOf(PropTypes.number)
};

export default VideoRate;
