/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 *
 * @class  LoginFormComponent - Login form component.
 * This must be the first and only component rendered in the root path "/"
 * It calls the authentication api.
 *
 * API:  http://localhost:3000/user/auth
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';
import MD5 from 'js-md5';

// -========================== COMPONENTS ==========================-
import Message from './../Commons/Messages.js';
import {
    DEFAULT_LOGIN_MESSAGE,
    USER_AND_PASS_ERROR,
    FORM_LOGOUT_LABEL,
    FORM_LOGIN_LABEL,
    INPUT_USER_LABEL,
    INPUT_PASS_LABEL,
    FORM_LOGIN_TITLE,
    TYPE_WARNING,
    TYPE_ERROR,
} from './../../constants/Strings';
import { LOGOUT_URL, VIDEO_LIST_URL, AUTH_URL } from '../../constants/Paths.js';
import { USER_DATA } from '../../constants/Storage.js';

/**
 * Form to login to the application.
 * It makes a call the the api to log in.
 */
export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            messageType: ''
        };

        this.handlerFocusInputs = this.handlerFocusInputs.bind(this);
        this.handlerBlurInputs = this.handlerBlurInputs.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    handleSubmitForm(event) {
        event.preventDefault();

        const {
            username,
            password
        } = this.refs;

        if (password.value.length > 2 && username.value.length > 2) {
            // make a request to the API
            // http://localhost:3000/user/auth
            SuperAgent.post(AUTH_URL)
                .type('form') // Shorthand to use the content type as: application/x-www-form-urlencoded
                .send({
                    'username': username.value,
                    'password': MD5(password.value) // Encrypt the password
                })
                .end((err, res) => {
                    if (err) {
                        this.setState({
                            messageText: DEFAULT_LOGIN_MESSAGE,
                            messageType: TYPE_ERROR
                        });
                    } else {
                        // Save in sessionStorage the params returned by the server
                        // Just in case the user refresh the website
                        if (res.body.status === 'success') {
                            sessionStorage.setItem(
                                USER_DATA,
                                JSON.stringify(res.body)
                            );
                            this.props.history.push(VIDEO_LIST_URL);
                        } else {
                            this.setState({
                                messageText: res.body.error,
                                messageType: TYPE_ERROR
                            });
                        }
                    }
                });
        } else {
            this.setState({
                messageText: USER_AND_PASS_ERROR,
                messageType: TYPE_WARNING
            });
        }

        // leave the focus always in the user name input
        username.focus();
    }

    // Small animation in the input filed
    handlerFocusInputs(event) {
        const element = event.currentTarget;

        if (!element.id.includes('lbl')) { // Does not has lbl class
            const label = document.getElementById(`lbl-${event.target.id}`);
            label.classList.contains('login-form-label-anim') || (
                label.classList.add('login-form-label-anim'),
                element.classList.add('login-form-input-active')
            );
        } else {
            element.classList.contains('login-form-label-anim') || (
                element.classList.add('login-form-label-anim'),
                document.getElementById(element.id.replace('lbl-', ''))
                    .classList.add('login-form-input-active')
            );
        }
    }

    handlerBlurInputs(event) {
        // It works along with handlerFocus function
        const element = event.currentTarget;
        !!element.value.length || (
            element.classList.remove('login-form-input-active'),
            document.getElementById(`lbl-${element.id}`)
                .classList.remove('login-form-label-anim')
        );
    }

    // -============================ REACT LIFECYLE ============================-
    componentDidUpdate() {
        if (this.state.messageType !== '') {
            const time = setTimeout(() => {
                this.setState({
                    messageText: '',
                    messageType: ''
                });

                clearTimeout(time);
            }, 2600);
        }
    }

    render() {
        const {
            messageText,
            messageType
        } = this.state;

        return (
            <div className="grid-container">
                <div className="grid-40 grid-parent login-form shadow">
                    <form onSubmit={this.handleSubmitForm}>
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
                                onFocus={this.handlerFocusInputs}
                                id="lbl-username"
                                className="login-form-label"
                                htmlFor="username">
                                {INPUT_USER_LABEL}
                            </label>
                        </div>
                        <div className="grid-100">
                            <input
                                onFocus={this.handlerFocusInputs}
                                onBlur={this.handlerBlurInputs}
                                className="login-form-input"
                                type="text"
                                id="username"
                                ref="username"
                            />
                        </div>
                        <div className="grid-100">
                            <label
                                onFocus={this.handlerFocusInputs}
                                id="lbl-password"
                                className="login-form-label"
                                htmlFor="password">
                                {INPUT_PASS_LABEL}
                            </label>
                        </div>
                        <div className="grid-100">
                            <input
                                onFocus={this.handlerFocusInputs}
                                onBlur={this.handlerBlurInputs}
                                className="login-form-input"
                                type="password"
                                id="password"
                                ref="password"
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

/**
 * Lougout the user.
 * This is use in the header component
 */
export const LogoutForm = () => {
    const handleClickButtonForm = () => {
        const userData = JSON.parse(sessionStorage.getItem(USER_DATA));

        if (userData) {
            SuperAgent.get(LOGOUT_URL)
                .type('form')
                .query({
                    'sessionId': userData.sessionId
                })
                .end((err, res) => {
                    if (res.body.status === 'success') {
                        // Clean all sessions
                        sessionStorage.clear();
                        window.location.href = '/'
                    } else {
                        // #TODO
                        // Display error message
                    }
                });
        }
    }

    return (
        <button type="button" onClick={handleClickButtonForm}>
            {FORM_LOGOUT_LABEL}
        </button>
    );
};
