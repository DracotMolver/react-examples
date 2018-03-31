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
import VideoDescription from './VideoDescription';
import VideoRateContainer from './../../containers/Commons/VideoRateContainer';
import VideoFullScreen from './VideoFullScreen';
import VideoRating from './VideoRating';
import VideoThumb from './VideoThumb';
import { BACK_BUTTON, RATE_BUTTON } from '../../constants/Strings';
import { VIDEO_LIST_URL } from '../../constants/Paths';

// It will render and small card component
export class VideoCardSmall extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const {
            description: prevDescription,
            ratings: prevRatings,
            name: prevName
        } = this.props;

        const {
            description: nextDescription,
            ratings: nextRatings,
            name: nextName
        } = nextProps;

        if (prevDescription === nextDescription &&
            prevRatings.length === nextRatings.length &&
            prevRatings.every((prevRating, index) => prevRating === nextRatings[index] &&
                prevName === nextName)
        ) {
            return false;
        }

        return true;
    }

    render() {
        const {
            description,
            ratings,
            name,
            _id
        } = this.props;

        return (
            <div className="grid-100 video-container shadow zoomInUp-anim">
                <div className="grid-100">
                    <h4 className="video-title">
                        {name}
                    </h4>
                </div>
                <div className="grid-100">
                    <VideoThumb id={_id} description={description} />
                </div>
                <div className="grid-100">
                    <VideoDescription description={description} />
                </div>
                <div className="grid-100">
                    <VideoRating ratings={ratings} />
                </div>
            </div>
        );
    }
}

VideoCardSmall.propTypes = {
    description: PropTypes.string,
    ratings: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    id: PropTypes.string
};

// ----------------------------------------------------------------------

// It will render a big (full screen) card component
export const VideoCardBig = props => {
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
