/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * it will get the video to render it
 */
// -========================== MODULES ==========================-
import React from 'react';

const VideoFullScreen = props =>
    <div className="video-full-screen">
        <video
            className="video-source-container"
            height="auto"
            width="100%"
            controls="true">
            <source src={props.url} type="video/mp4"></source>
        </video>
        <div className="video-hover" >Play!</div>
    </div>;

export default VideoFullScreen;
