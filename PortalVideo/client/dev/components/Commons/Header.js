/**
 * @author Diego Alberto Molina Vera
 * @copyright 2017 - 2018
 *
 * @class HeaderComponent - Header of the website
 * Just a simple header where the user can logout later.
 */
// -========================== MODULES ==========================-
import React from 'react';
import SuperAgent from 'superagent';

// -========================== COMPONENTS ==========================-
import { GREETINGS } from './../../constants/Strings';
import { LogoutForm } from './../Login/LoginForm';
import { USER_DATA } from '../../constants/Storage';

const Header = () => {
    const username = JSON.parse(sessionStorage.getItem(USER_DATA)).username;

    return (
        <div className="grid-100 grid-parent header-nav">
            <div className="grid-container">
                <header>
                    <span>{GREETINGS} {username}</span>
                    <LogoutForm />
                </header>
            </div>
        </div>
    );
};

export default Header;
