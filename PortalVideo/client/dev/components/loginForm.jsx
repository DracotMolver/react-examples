/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 * @class  LoginFormComponent - Login form component.
 * This must be the first and only component rendered in the root path "/"
 * It makes call to the authentication api.
 *
 * It will render the login form.
 *
 * API:  http://localhost:3000/user/auth
 */
// -========================== MODULES ==========================-
// HTTP request
import SuperAgent from 'superagent';
// Hashing using MD5
import MD5 from 'js-md5';

import React from 'react';

// CSS grid framework system
import {
    GridContainer,
    Grid
} from 'unsemantic';

// -========================== COMPONENTS ==========================-
import MessageComponent from './messages.jsx'

let LoginFormComponent = React.createClass({
    getInitialState () {
        // Sets empties values to validate if the user has been logedo or not
        // This params are the sames as the ones that returns the API.
        return {
            errorMessage: '',
            errorType: ''
        };
    },
    handleSubmitForm (e) {
        // Encrypt the password
        const username = this.refs.username.value;
        let password = this.refs.password.value;
        if (password.length > 2 && username.length > 2) {
            password = MD5(password);

            // make a request to the API
            // http://localhost:3000/user/auth
            SuperAgent.post('/user/auth')
                .type('form') // Shorthand to use the content type as: application/x-www-form-urlencoded
                .send({ username, password })
                .end((function (err, res) {
                    if (err) {
                        this.setState({
                            errorMessage: 'There was an error. Please, try later',
                            errorType: 'error'
                        });
                    } else {
                        if (res.body.status === 'success') {
                            // Save in sessionStorage the params returned by the server
                            // Just in case the user refresh the website
                            sessionStorage.setItem('userData', JSON.stringify(res.body))
                            this.props.history.push('videos-list');
                        } else {
                            this.setState({
                                errorMessage: res.body.error,
                                errorType: 'error'
                            });
                        }
                    }
                }).bind(this));
        } else {
            this.setState({
                errorMessage: 'The Username and the Password field can\'t be empty',
                errorType: 'warning'
            });

            e.target.username.focus();
        }

        e.preventDefault();
    },
    handlerFocusInputs (e) {
        // Small animation in the input filed
        // #TODO improve the code
        if (!e.target.id.includes('lbl')) {
            let label = document.getElementById('lbl-' + e.target.id);
            if (!label.classList.contains('login-form-label-anim')) {
                label.classList.add('login-form-label-anim');
                e.target.classList.add('login-form-input-active');
            }
        } else {
            if (!e.target.classList.contains('login-form-label-anim')) {
                e.target.classList.add('login-form-label-anim');
                document.getElementById(e.target.id.replace('lbl-', ''))
                    .classList.add('login-form-input-active');
            }
        }
    },
    handlerBlurInputs (e) {
        // It works along with handlerFocus function
        if (e.target.value.length === 0) {
            e.target.classList.remove('login-form-input-active');
            document.getElementById('lbl-' + e.target.id).classList.remove('login-form-label-anim');
        }
    },
    componentDidUpdate () {
        if (this.state.errorMessage !== '') {
            let time = setTimeout((function() {
                this.setState({
                    errorMessage: '',
                    errorType: ''
                })
                clearTimeout(time)
            }).bind(this), 2600);
        }
    },
    render () {
        return (
            <GridContainer>
                <Grid desktop="40 login-form shadow" parent>
                    <form onSubmit={this.handleSubmitForm}>
                        <Grid desktop="100" parent>
                            <Grid desktop="100 login-form-title" parent>
                                <span>Video portal</span>
                            </Grid>
                            <MessageComponent
                                errorMessage={this.state.errorMessage}
                                errorType={this.state.errorType} />
                        </Grid>
                        <Grid desktop="100">
                            <Grid desktop="100">
                                <label
                                    onFocus={this.handlerFocusInputs}
                                    id="lbl-username"
                                    className="login-form-label"
                                    htmlFor="username">User name</label>
                            </Grid>
                            <Grid desktop="100">
                                <input
                                    onFocus={this.handlerFocusInputs}
                                    onBlur={this.handlerBlurInputs}
                                    className="login-form-input"
                                    type="text"
                                    id="username"
                                    ref="username" />
                            </Grid>
                        </Grid>
                        <Grid desktop="100">
                            <Grid desktop="100">
                                <label
                                    onFocus={this.handlerFocusInputs}
                                    id="lbl-password"
                                    className="login-form-label"
                                    htmlFor="password">Password</label>
                            </Grid>
                            <Grid desktop="100">
                                <input
                                    onFocus={this.handlerFocusInputs}
                                    onBlur={this.handlerBlurInputs}
                                    className="login-form-input"
                                    type="password"
                                    id="password"
                                    ref="password" />
                            </Grid>
                        </Grid>
                        <Grid desktop="100">
                            <button className="button shadow" type="submit">Login</button>
                        </Grid>
                    </form>
                </Grid>
            </GridContainer>
        );
    }
});

let LogoutFormComponent = React.createClass({
    handleClickButtonForm () {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData !== null) {

            SuperAgent.get('/user/logout')
                .type('form')
                .query({
                    sessionId: userData.sessionId
                })
                .end((function (err, res) {
                    if (res.body.status === 'success') {
                        // Clean all sessions
                        sessionStorage.clear();
                        window.location.reload(true);
                    } else {
                        // Display error message
                    }
                }).bind(this));
        }
    },
    render () {
        return (
            <button type="button" onClick={this.handleClickButtonForm}>Logout</button>
        );
    }
});

export { LoginFormComponent, LogoutFormComponent };
