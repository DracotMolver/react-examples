/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * It will display the description of the video
 */
// -========================== MODULES ==========================-
import React from 'react';

const VideoDescription = props =>
    <div>
        <p className="video-description">
            {props.description}
        </p>
        <div className="line-separator"></div>
    </div>;

export default VideoDescription;