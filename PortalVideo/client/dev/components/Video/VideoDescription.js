/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

const VideoDescription = props =>
    <div>
        <p className="video-description">
            {props.description}
        </p>
        <div className="line-separator"></div>
    </div>;

VideoDescription.propTypes = {
    description: PropTypes.string
};

export default VideoDescription;
