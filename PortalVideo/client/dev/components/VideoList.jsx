/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 * 
 * Acts as video container.
 */
// -========================== MODULES ==========================-
import React from 'react';

// -========================== COMPONENTS ==========================-
import { VideoCardItem } from './VideoCard.jsx';
import videoLoader from './HOC/VideoLoader.jsx';

const VideoList = props => {
    // Generate the list of videos cards.
    return props.videoList.map(video => (
        <div key={`${video._id}`} id={`${video._id}`} className="video-list-item">
            <div className="grid-25">
                <VideoCardItem
                    title={video.name}
                    id={video._id}
                    description={video.description}
                    ratings={video.ratings}
                />
            </div>
        </div>
    ));
};

export default videoLoader('videoList')(VideoList);
