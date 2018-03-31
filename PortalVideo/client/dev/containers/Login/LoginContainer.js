/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 */

// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';
import MD5 from 'js-md5';

// -========================== COMPONENTS ==========================-
import Login from './../../components/Login/Login';
import {
    TYPE_WARNING,
    USER_AND_PASS_ERROR,
    TYPE_ERROR,
    DEFAULT_ERROR_MESSAGE
} from './../../constants/Strings';
import {
    AUTH_URL,
    VIDEO_LIST_URL,
} from './../../constants/Paths';
import { USER_DATA } from './../../constants/Storage';

export default class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            messageType: '',
            password: '',
            username: ''
        };

        this.handlerFocusInputs = this.handlerFocusInputs.bind(this);
        this.handlerBlurInputs = this.handlerBlurInputs.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    // -============================ OWN EVENTS ============================-
    handleSubmitForm(event) {
        event.preventDefault();

        const {
            username,
            password
        } = this.state;

        if (password.length > 2 && username.length > 2) {
            // make a request to the API
            // http://localhost:3000/user/auth
            SuperAgent.post(AUTH_URL)
                .type('form') // Shorthand to use the content type as: application/x-www-form-urlencoded
                .send({
                    'username': username,
                    'password': MD5(password) // Encrypt the password
                })
                .end((err, res) => {
                    if (err) {
                        this.setState({
                            messageText: DEFAULT_ERROR_MESSAGE,
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

    setPassword(event) {
        this.setState({
            password: event.currentTarget.value
        });
    }

    setUsername(event) {
        this.setState({
            username: event.currentTarget.value
        });
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
            messageType,
        } = this.state;

        return (
            <Login
                handlerFocusInputs={this.handlerFocusInputs}
                handlerBlurInputs={this.handlerBlurInputs}
                handleSubmitForm={this.handleSubmitForm}
                messageText={messageText}
                messageType={messageType}
                setPassword={this.setPassword}
                setUsername={this.setUsername}
            />
        );
    }
}