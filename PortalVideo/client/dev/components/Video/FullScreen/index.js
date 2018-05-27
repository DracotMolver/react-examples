/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';
import { PLAY_BUTTON } from 'Constants/Strings';

const VideoFullScreen = props =>
    <div className="video-full-screen">
        <video
            className="video-source-container"
            height="auto"
            width="100%"
            controls="true">
            <source src={props.url} type="video/mp4"></source>
        </video>
        <div className="video-hover" >{PLAY_BUTTON}</div>
    </div>;

VideoFullScreen.propTypes = {
    url: PropTypes.string
};

export default VideoFullScreen;
