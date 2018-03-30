/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 * 
 * Acts as video container.
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import { VideoCardItem } from './../Video/VideoCard';
import videoLoader from './../HOC/VideoLoader';

// Generate the list of videos cards.
const VideoList = props =>
    props.videoList.map(video =>
        <div key={`${video._id}`} id={`${video._id}`}
            className="video-list-item grid-25 mobile-grid-50">
            <VideoCardItem
                name={video.name}
                id={video._id}
                description={video.description}
                ratings={video.ratings}
            />
        </div>
    );

VideoList.propTypes = {
    videoList: PropTypes.array
};

export default videoLoader('videoList')(VideoList);
