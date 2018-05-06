/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * There are two types of cards. One it's as items for a list
 * and the other one is for a single element for full screen
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import VideoDescription from 'Video/VideoDescription';
import VideoRating from 'Video/VideoRating';
import VideoThumb from 'Video/VideoThumb';

// It will render and small card component
export default class VideoCardSmall extends React.Component {
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

        const isRatingsEquals = prevRatings.every((prevRating, index) =>
            prevRating === nextRatings[index] && prevName === nextName
        );

        if (prevDescription === nextDescription &&
            prevRatings.length === nextRatings.length &&
            isRatingsEquals
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
