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
import Message from './../Commons/Messages.jsx'

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
    handleSubmitForm(e) {
        e.preventDefault();

        const {
            username,
            password
        } = this.refs

        if (password.value.length > 2 && username.value.length > 2) {
            // make a request to the API
            // http://localhost:3000/user/auth
            SuperAgent.post('/user/auth')
                .type('form') // Shorthand to use the content type as: application/x-www-form-urlencoded
                .send({
                    'username': username.value,
                    'password': MD5(password.value) // Encrypt the password
                })
                .end((err, res) => {
                    if (err) {
                        this.setState({
                            messageText: 'There was an error. Please, try later',
                            messageType: 'error'
                        });
                    } else {
                        // Save in sessionStorage the params returned by the server
                        // Just in case the user refresh the website
                        if (res.body.status === 'success') {
                            sessionStorage.setItem('userData', JSON.stringify(res.body));
                            this.props.history.push('videos-list');
                        } else {
                            this.setState({
                                messageText: res.body.error,
                                messageType: 'error'
                            });
                        }
                    }
                });
        } else {
            this.setState({
                messageText: 'The Username and the Password field can\'t be empty',
                messageType: 'warning'
            });
        }

        // leav the focus always in the user name input
        username.focus();
    }

    // Small animation in the input filed
    handlerFocusInputs(e) {
        let element = e.target;

        if (!element.id.includes('lbl')) { // Does not has lbl class
            let label = document.getElementById(`lbl-${e.target.id}`);
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

    handlerBlurInputs(e) {
        // It works along with handlerFocus function
        let element = e.target;

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
                            <span>Video portal</span>
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
                                User name
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
                                Password
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
                                Login
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
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData) {
            SuperAgent.get('/user/logout')
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
            Log out
        </button>
    );
};
