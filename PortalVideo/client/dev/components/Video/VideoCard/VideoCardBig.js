/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * There are two types of cards. One it's as items for a list
 * and the other one is for a single element for full screen
 */
// -========================== MODULES ==========================-
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import VideoRating from 'Video/VideoRating';
import VideoDescription from 'Video/VideoDescription';
import VideoRateContainer from '_Commons/VideoRateContainer';
import VideoFullScreen from 'Video/VideoFullScreen';
import { BACK_BUTTON, RATE_BUTTON } from 'Constants/Strings';
import { VIDEO_LIST_URL } from 'Constants/Paths';

// It will render a big (full screen) card component
const VideoCardBig = props => {
    const {
        handleClickRate,
        displayPopUp,
        description,
        hidePopUp,
        ratings,
        name,
        url,
        _id
    } = props;

    return (
        <div className="video-single-container">
            <VideoRateContainer
                idToRate={_id}
                displayPopUp={displayPopUp}
                hidePopUp={hidePopUp}
            />
            <div className="grid-container">
                <div className="grid-100">
                    <Link className="back-arrow" to={VIDEO_LIST_URL}>
                        &larr; {BACK_BUTTON}
                    </Link>
                </div>
                <div className="grid-100 grid-parent video-container shadow">
                    <div className="grid-100 grid-parent">
                        <div className="grid-50">
                            <h4 className="video-title">
                                {name}
                            </h4>
                        </div>
                        <div className="grid-50 grid-parent">
                            <div className="grid-80 mobile-grid-70" style={{ textAlign: 'right' }}>
                                <VideoRating ratings={ratings} />
                            </div>
                            <div className="grid-20 mobile-grid-30">
                                <button
                                    type="button"
                                    className="rate-button"
                                    onClick={handleClickRate}
                                >
                                    {RATE_BUTTON}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid-100">
                        <VideoFullScreen url={url} />
                    </div>
                    <div className="grid-100">
                        <VideoDescription description={description} />
                    </div>
                </div>
            </div>
        </div>
    );
};

VideoCardBig.propTypes = {
    handleClickRate: PropTypes.func,
    displayPopUp: PropTypes.bool,
    description: PropTypes.string,
    hidePopUp: PropTypes.func,
    ratings: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    url: PropTypes.string,
    _id: PropTypes.string
};

export default VideoCardBig;