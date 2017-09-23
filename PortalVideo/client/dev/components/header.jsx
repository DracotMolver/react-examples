/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017
 *
 * @class HeaderComponent - Header of the website
 * Just a simple header where the user can logout later.
 */
// -========================== MODULES ==========================-
// HTTP Requests
import SuperAgent from 'superagent';

import React from 'react';

// CSS grid framework system
import {
    GridContainer,
    Grid
} from 'unsemantic';

// -========================== COMPONENTS ==========================-
import { LogoutFormComponent } from './loginForm.jsx'

let HeaderComponent = React.createClass({
    getInitialState () {
        let username = '';
        if (sessionStorage.getItem('userData') !== null) {
            username = JSON.parse(sessionStorage.getItem('userData')).username;
        }

        return {
            username
        };
    },
    render () {
        return (
            <Grid desktop="100 header-nav" parent>
                <GridContainer>
                    <header>
                        <span>Hi! {this.state.username}</span>
                        <LogoutFormComponent />
                    </header>
                </GridContainer>
            </Grid>
        );
    }
});

export default HeaderComponent;
