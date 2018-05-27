/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import VideoRatePopPup from 'Components/Video/Rate/PopUp';
import { VIDEO_RATING_URL } from 'Constants/Paths';
import { USER_DATA } from 'Constants/Storage';
import { getUserData } from 'Helpers';

export default class VideoRateContainer extends React.Component {
    constructor(props) {
        super();

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
            state,
            props
        } = this;

        const {
            hidePopUp,
            idToRate
        } = props;

        const { sessionId } = getUserData();

        SuperAgent.post(VIDEO_RATING_URL)
            .type('form')
            .query({
                sessionId
            })
            .send({
                'videoId': idToRate,
                'rating': state.value,
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
            handleClickClose,
            handleChangeRate,
            handleClickDone,
            props,
            state,
        } = this;

        return (
            <VideoRatePopPup
                displayPopUp={props.displayPopUp}
                isSuccess={state.isSuccess}
                handleClickClose={handleClickClose}
                handleChangeRate={handleChangeRate}
                handleClickDone={handleClickDone}
            />
        );
    }
}

VideoRateContainer.propTypes = {
    hidePopUp: PropTypes.func,
    idToRate: PropTypes.string,
    displayPopUp: PropTypes.bool
};
