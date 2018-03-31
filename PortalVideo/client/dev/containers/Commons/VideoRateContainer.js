/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import VideoRatePopPup from './../../components/Video/VideoRatePopPup';
import { VIDEO_RATING_URL } from '../../constants/Paths';
import { USER_DATA } from '../../constants/Storage';

export default class VideoRateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false,
            value: 0,
            id: '',
        };

        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleChangeRate = this.handleChangeRate.bind(this);
        this.handleClickDone = this.handleClickDone.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    handleChangeRate(event) {
        this.setState({
            value: event.currentTarget.value
        });
    }

    handleClickClose() {
        this.setState({
            isSuccess: false,
            value: 0,
            id: ''
        });

        // Belongs to the parent - VideoCardBigWrapper
        this.props.hidePopUp();
    }

    handleClickDone() {
        const {
            hidePopUp,
            idToRate
        } = this.props;

        SuperAgent.post(VIDEO_RATING_URL)
            .type('form')
            .query({
                'sessionId': JSON.parse(sessionStorage.getItem(USER_DATA)).sessionId
            })
            .send({
                'videoId': idToRate,
                'rating': this.state.value,
            })
            .end((err, res) => {
                if (err) {
                    this.setState({
                        isSuccess: false
                    });

                    hidePopUp();
                } else {
                    if (res.body.status === 'success') {
                        this.setState({
                            isSuccess: true
                        });
                    } else {
                        hidePopUp();
                    }
                }
            });
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        const {
            displayPopUp
        } = this.props;

        return (
            <VideoRatePopPup
                displayPopUp={displayPopUp}
                isSuccess={this.state.isSuccess}
                handleClickClose={this.handleClickClose}
                handleChangeRate={this.handleChangeRate}
                handleClickDone={this.handleClickDone}
            />
        );
    }
}

VideoRateContainer.propTypes = {
    hidePopUp: PropTypes.func,
    idToRate: PropTypes.string,
    displayPopUp: PropTypes.bool
};
