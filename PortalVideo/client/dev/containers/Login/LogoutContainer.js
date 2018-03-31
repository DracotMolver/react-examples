/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 */

// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import Logout from './../../components/Login/Logout';
import { USER_DATA } from '../../constants/Storage';
import { LOGOUT_URL } from '../../constants/Paths';

export default class LogoutContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickButtonForm = this.handleClickButtonForm.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    handleClickButtonForm() {
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
                        window.location.href = '/';
                    } else {
                        // #TODO
                        // Display error message
                    }
                });
        }
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        return (
            <Logout handleClickButtonForm={this.handleClickButtonForm} />
        );
    }
}

