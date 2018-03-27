/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * It will make a Card that contains:
 * 
 * - The image of the video
 * - The description
 * - The rating
 * 
 * There are two types of cards. One it's as items for a list
 * and the other one is for a single element for full screen
 */
// -========================== MODULES ==========================-
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import VideoDescription from './VideoDescription.jsx';
import VideoRatePopPup from './VideoRatePopPup.jsx';
import VideoFullScreen from './VideoFullScreen.jsx';
import VideoRating from './VideoRating.jsx';
import videoLoader from './../HOC/VideoLoader.jsx';
import VideoThumb from './VideoThumb.jsx';

export class VideoCardItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.description === nextProps.description &&
            this.props.ratings.length === nextProps.ratings.length &&
            this.props.ratings.every((prevRating, index) => prevRating === nextProps.ratings[index] &&
                this.props.title === nextProps.title)
        ) {
            return true;
        }

        return false;
    }

    render() {
        const {
            description,
            ratings,
            title,
            id
        } = this.props;

        return (
            <div className="grid-100 video-container shadow zoomInUp-anim">
                <div className="grid-100">
                    <h4 className="video-title">
                        {title}
                    </h4>
                </div>
                <div className="grid-100">
                    <VideoThumb id={id} description={description} />
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
};

VideoCardItem.propTypes = {
    description: PropTypes.string,
    ratings: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string,
    id: PropTypes.string
};

// ----------------------------------------------------------------------

class VideoCardBigWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPopUp: false
        };

        this.handleClickRate = this.handleClickRate.bind(this);
        this.hidePopUp = this.hidePopUp.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    handleClickRate() {
        this.setState({
            displayPopUp: true
        });
    }

    hidePopUp() {
        this.setState({
            displayPopUp: false
        });
    }

    // -============================ REACT LIFECYLE ============================-
    render() {
        const {
            description,
            ratings,
            title,
            url,
            _id
        } = this.props.videoData;

        return (
            <div className="video-single-container">
                <VideoRatePopPup
                    idToRate={_id}
                    displayPopUp={this.state.displayPopUp}
                    hidePopUp={this.hidePopUp}
                />
                <div className="grid-container">
                    <div className="grid-100">
                        <Link className="back-arrow" to="/videos-list">
                            &larr; Back to the list
                        </Link>
                    </div>
                    <div className="grid-100 grid-parent video-container shadow">
                        <div className="grid-100 grid-parent">
                            <div className="grid-50">
                                <h4 className="video-title">
                                    {title}
                                </h4>
                            </div>
                            <div className="grid-50 grid-parent">
                                <div className="grid-100 grid-parent">
                                    <div className="grid-80" style={{ textAlign: 'right' }}>
                                        <VideoRating ratings={ratings} />
                                    </div>
                                    <div className="grid-20 grid-parent">
                                        <button
                                            type="button"
                                            className="rate-button"
                                            onClick={this.handleClickRate}
                                        >
                                            Rate!
                                        </button>
                                    </div>
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
    }
}

VideoCardBigWrapper.propTypes = {
    videoData: PropTypes.shape({
        description: PropTypes.string,
        ratings: PropTypes.arrayOf(PropTypes.number),
        title: PropTypes.sring,
        url: PropTypes.sring,
        _id: PropTypes.string
    })
};

export const VideoCardBig = videoLoader('videoData')(VideoCardBigWrapper);
