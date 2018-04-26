/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import VideoCardBig from 'Video/VideoCard/VideoCardBig';
import videoLoader from 'HOC/VideoLoader';

class VideoCardContainer extends React.Component {
    constructor(props) {
        super();

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
            handleClickRate,
            hidePopUp,
            state,
            props
        } = this;

        return (
            <VideoCardBig
                {...props.videoData}
                hidePopUp={hidePopUp}
                handleClickRate={handleClickRate}
                displayPopUp={state.displayPopUp}
            />
        );
    }
}

VideoCardContainer.propTypes = {
    videoData: PropTypes.shape({
        description: PropTypes.string,
        ratings: PropTypes.arrayOf(PropTypes.number),
        name: PropTypes.string,
        url: PropTypes.string,
        _id: PropTypes.string
    })
};

export default videoLoader('videoData')(VideoCardContainer);
