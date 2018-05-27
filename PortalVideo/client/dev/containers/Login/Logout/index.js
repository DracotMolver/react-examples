/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 -2018
 */

// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import { USER_DATA } from 'Constants/Storage';
import { LOGOUT_URL } from 'Constants/Paths';
import { getUserData } from 'Helpers';
import Logout from 'Components/Login/Logout';

export default class LogoutContainer extends React.Component {
    constructor(props) {
        super();

        this.handleClickButtonForm = this.handleClickButtonForm.bind(this);
    }

    // -============================ OWN EVENTS ============================-

    handleClickButtonForm() {
        const { sessionId } = getUserData();

        SuperAgent.get(LOGOUT_URL)
            .type('form')
            .query({
                sessionId
            })
            .end((err, res) => {
                if (res.body.status === 'success') {
                    // Clean all sessions
                    sessionStorage.clear();
                    window.location.href = '/';
                } else {
                    // TODO: Display error message
                }
            });
    }

    // -============================ REACT LIFECYLE ============================-

    render() {
        return (
            <Logout handleClickButtonForm={this.handleClickButtonForm} />
        );
    }
}
