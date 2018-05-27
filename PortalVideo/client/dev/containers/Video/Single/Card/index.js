/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import VideoCardBig from 'Components/Video/Card/Big';
import Loader from 'Components/HOC/Loader';

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

export default Loader('videoData')(VideoCardContainer);
