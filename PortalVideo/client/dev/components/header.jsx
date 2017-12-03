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

// -========================== COMPONENTS ==========================-
import { LogoutFormComponent } from './loginForm.jsx'

const HeaderComponent = () => {
    let username = '';
    sessionStorage.getItem('userData') && (
        username = JSON.parse(sessionStorage.getItem('userData')).username
    );

    return (
        <div className="grid-100 grid-parent header-nav">
            <div className="grid-container">
                <header>
                    <span>Hi! {username}</span>
                    {LogoutFormComponent()}
                </header>
            </div>
        </div>
    );
};

export default HeaderComponent;