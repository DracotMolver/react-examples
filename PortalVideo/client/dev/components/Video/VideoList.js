/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import { VideoCardSmall } from './../Video/VideoCard';
import videoLoader from './../HOC/VideoLoader';
import { LOAD_VIDEOS_BUTTON } from '../../constants/Strings';

// It will return a map of components
const VideoItems = props =>
    props.videoListItems.map(video =>
        <div key={`${video._id}`} id={`${video._id}`}
            className="video-list-item grid-25 mobile-grid-50">
            <VideoCardSmall {...video} />
        </div>
    );

VideoItems.propTypes = {
    videoList: PropTypes.arrayOf(PropTypes.object)
};

// ----------------------------------------------------------------------

// Generate the list of videos cards.
const VideoList = props => {
    const {
        videoListItems,
        getMoreVideos
    } = props;

    return (
        <React.Fragment>
            <div className="grid-container">
                <VideoItems videoListItems={videoListItems} />
                <div className="grid-25 mobile-grid-100 zoomInUp-anim">
                    <button
                        onClick={getMoreVideos}
                        id="show-more"
                        className="button shadow"
                        type="button"
                    >
                        {LOAD_VIDEOS_BUTTON}
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

VideoList.propTypes = {
    videoListItems: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            ratings: PropTypes.arrayOf(PropTypes.number),
            name: PropTypes.string,
            url: PropTypes.string,
            _id: PropTypes.string
        })
    ),
    getMoreVideos: PropTypes.func
};

export default videoLoader('videoListItems')(VideoList);
