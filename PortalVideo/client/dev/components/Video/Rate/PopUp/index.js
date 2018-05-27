/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';
import {
    POPUP_TITLE_SUCCESS,
    POPUP_TITLE_INITIAL,
    CLOSE_BUTTON,
    POPUP_BUTTON
} from 'Constants/Strings';

// A common wrapper component as popup
const PopUpParent = props => {
    const {
        handleClickClose,
        name
    } = props;

    return (
        <div>
            <div className="grid-100">
                <div className="rate-close-popup"
                    onClick={handleClickClose}
                >
                    {CLOSE_BUTTON} &#10005;
                </div>
            </div>
            <div className="grid-100">
                <h3>{name}</h3>
            </div>
            <div className="grid-100 grid-parent">
                {props.children}
            </div>
        </div>
    );
};

PopUpParent.propTypes = {
    name: PropTypes.string,
    handleClickClose: PropTypes.func
};

// ------------------------------------------------------------------------

const InitialMessage = props => {
    const {
        handleChangeRate,
        handleClickClose,
        handleClickDone
    } = props;

    let inputs = [];

    for (let i = 0; i < 5; i++) {
        inputs.push(
            <div key={`rate-${i}`}>
                <div className="grid-20 mobile-grid-20">
                    <input
                        className="option-input"
                        name="rateVideo"
                        type="radio"
                        value={`${i + 1}`}
                        onChange={handleChangeRate}
                    />
                    {`+${i + 1}`}
                </div>
            </div>
        );
    }

    return (
        <PopUpParent
            handleClickClose={handleClickClose}
            name={POPUP_TITLE_INITIAL}
        >
            <div>
                <div className="grid-100 rate-stars-input">
                    {inputs}
                </div>
                <div className="grid-100">
                    <div className="rate-button-container">
                        <button type="button"
                            className="button shadow"
                            onClick={handleClickDone}
                        >
                            {POPUP_BUTTON}
                        </button>
                    </div>
                </div>
            </div>
        </PopUpParent>
    );
};

InitialMessage.propTypes = {
    handleChangeRate: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleClickDone: PropTypes.func
};

// ------------------------------------------------------------------------

const SuccessMessage = props => {
    const {
        handleClickClose
    } = props;

    let time = setTimeout(() => {
        handleClickClose();
        clearTimeout(time);
    }, 2600);

    const closePopUp = () => {
        handleClickClose();
        clearTimeout(time);
    };

    return <PopUpParent
        handleClickClose={closePopUp}
        name={POPUP_TITLE_SUCCESS}
    />;
};

SuccessMessage.propTypes = {
    handleClickClose: PropTypes.func
};

// ------------------------------------------------------------------------

const VideoRatePopUp = props => {
    const {
        handleClickClose,
        handleChangeRate,
        handleClickDone,
        displayPopUp,
        isSuccess
    } = props;

    return (
        <div className={`rate-stars-container ${displayPopUp ? '' : 'hide'}`}>
            <div className="grid-container">
                <div className={`rate-stars-popup shadow ${displayPopUp ? 'fadeInDown-anim' : ''}`}>
                    {
                        isSuccess
                            ? <SuccessMessage
                                handleClickClose={handleClickClose}
                            />
                            : <InitialMessage
                                handleClickClose={handleClickClose}
                                handleChangeRate={handleChangeRate}
                                handleClickDone={handleClickDone}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

VideoRatePopUp.propTypes = {
    handleClickClose: PropTypes.func,
    handleChangeRate: PropTypes.func,
    handleClickDone: PropTypes.func,
    displayPopUp: PropTypes.bool,
    isSuccess: PropTypes.bool
};

export default VideoRatePopUp;