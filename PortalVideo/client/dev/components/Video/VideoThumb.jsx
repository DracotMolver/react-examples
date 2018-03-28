/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * The small image of the video
 */
// -========================== MODULES ==========================-
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VideoThumb = props => {
    const {
        description,
        id
    } = props;

    return (
        <Link to={`/videos-list/${id}`}>
            <div className="video-thumb">
                <img src="" alt={description} />
            </div>
        </Link>
    );
};

VideoThumb.propTypes ={
    description: PropTypes.string,
    id: PropTypes.string
};

export default VideoThumb;