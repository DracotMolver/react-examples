/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 */
// -========================== MODULES ==========================-
import React from 'react';
import PropTypes from 'prop-types';

// -========================== COMPONENTS ==========================-
import Message from 'Commons/Messages.js';
import {
    FORM_LOGIN_LABEL,
    INPUT_USER_LABEL,
    INPUT_PASS_LABEL,
    FORM_LOGIN_TITLE
} from 'Constants/Strings';

export default class Login extends React.Component {
    render() {
        const {
            handlerFocusInputs,
            handlerBlurInputs,
            handleSubmitForm,
            setPassword,
            setUsername,
            messageText,
            messageType
        } = this.props;

        return (
            <div className="grid-container">
                <div className="grid-40 grid-parent login-form shadow">
                    <form onSubmit={handleSubmitForm}>
                        <div className="grid-100 grid-parent login-form-title">
                            <span>{FORM_LOGIN_TITLE}</span>
                        </div>
                        <div className="grid-100 grid-parent">
                            <Message
                                messageText={messageText}
                                messageType={messageType}
                            />
                        </div>
                        <div className="grid-100">
                            <label
                                onFocus={handlerFocusInputs}
                                id="lbl-username"
                                className="login-form-label"
                                htmlFor="username">
                                {INPUT_USER_LABEL}
                            </label>
                        </div>
                        <div className="grid-100">
                            <input
                                onFocus={handlerFocusInputs}
                                onBlur={handlerBlurInputs}
                                onChange={setUsername}
                                className="login-form-input"
                                type="text"
                                id="username"
                            />
                        </div>
                        <div className="grid-100">
                            <label
                                onFocus={handlerFocusInputs}
                                id="lbl-password"
                                className="login-form-label"
                                htmlFor="password">
                                {INPUT_PASS_LABEL}
                            </label>
                        </div>
                        <div className="grid-100">
                            <input
                                onFocus={handlerFocusInputs}
                                onBlur={handlerBlurInputs}
                                onChange={setPassword}
                                className="login-form-input"
                                type="password"
                                id="password"
                            />
                        </div>
                        <div className="grid-100">
                            <button className="button shadow" type="submit">
                                {FORM_LOGIN_LABEL}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    handlerFocusInputs: PropTypes.func,
    handlerBlurInputs: PropTypes.func,
    handleSubmitForm: PropTypes.func,
    setPassword: PropTypes.func,
    setUsername: PropTypes.func,
    messageText: PropTypes.string,
    messageType: PropTypes.string
};
